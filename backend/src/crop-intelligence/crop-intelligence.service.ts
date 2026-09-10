import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherService } from '../weather/weather.service';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { calculateExpectedStage } from '../crops/utils/growth-stage.util';
import { CropStatus, CropTrend, cropIntelligenceDto } from './dto/crop-intelligence.dto';

@Injectable()
export class CropIntelligenceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly weatherService: WeatherService,
  ) {}

  async getForField(
    fieldId: string,
    currentUser: AuthenticatedUser,
  ): Promise<cropIntelligenceDto> {
    const field = await this.prisma.field.findUnique({
      where: { id: fieldId },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    if (
      currentUser.role === Role.AGENT &&
      field.assignedAgentId !== currentUser.id
    ) {
      throw new ForbiddenException('You do not have access to this field');
    }

    const crop = await this.prisma.crop.findFirst({
      where: { fieldId, growthStage: { not: 'HARVESTED' } },
      orderBy: { plantingDate: 'desc' },
    });

    if (!crop) {
      throw new NotFoundException('No active crop found for this field');
    }

    const recentUpdates = await this.prisma.fieldUpdate.findMany({
      where: { fieldId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const latestUpdate = recentUpdates[0] ?? null;
    const expectedGrowthStage = calculateExpectedStage(crop.plantingDate);

    let weatherForecastRain: number | null = null;
    try {
      const weather = await this.weatherService.getByField(
        fieldId,
        currentUser,
      );
      weatherForecastRain = weather.forecast[0]?.chanceOfRain ?? null;
    } catch {
      weatherForecastRain = null; 
    }

    const status = this.calculateStatus(
      crop.growthStage,
      expectedGrowthStage,
      latestUpdate,
    );
    const trend = this.calculateTrend(recentUpdates);
    const insights = this.generateInsights({
      growthStage: crop.growthStage,
      expectedGrowthStage,
      latestUpdate,
      trend,
      weatherForecastRain,
    });

    return {
      cropId: crop.id,
      fieldId: field.id,
      fieldName: field.name,
      cropName: crop.name,
      variety: crop.variety,
      growthStage: crop.growthStage,
      weatherForecastRain,
      expectedGrowthStage,
      status,
      trend,
      metrics: {
        moisture: latestUpdate?.moisture ?? null,
        temperature: latestUpdate?.temperature ?? null,
        humidity: latestUpdate?.humidity ?? null,
      },
      insights,
    };
  }

  private calculateStatus(
    actualStage: string,
    expectedStage: string,
    latestUpdate: {
      moisture: number | null;
      temperature: number | null;
      humidity: number | null;
    } | null,
  ): CropStatus {  
    const stageOrder = [
      'PLANTED',
      'GERMINATION',
      'VEGETATIVE',
      'FLOWERING',
      'FRUITING',
      'HARVEST_READY',
      'HARVESTED',
    ];
    const actualIndex = stageOrder.indexOf(actualStage);
    const expectedIndex = stageOrder.indexOf(expectedStage);
    const stageLag = expectedIndex - actualIndex; 

    let riskScore = 0;

    if (stageLag >= 2) riskScore += 2;
    else if (stageLag === 1) riskScore += 1;

    if (latestUpdate) {
      const { moisture, temperature, humidity } = latestUpdate;

      if (moisture !== null && (moisture < 15 || moisture > 95)) riskScore += 2;
      else if (moisture !== null && (moisture < 30 || moisture > 90))
        riskScore += 1;

      if (temperature !== null && (temperature < 10 || temperature > 40))
        riskScore += 2;
      else if (temperature !== null && (temperature < 15 || temperature > 35))
        riskScore += 1;

      if (humidity !== null && (humidity < 20 || humidity > 95)) riskScore += 1;
    } else {
      riskScore += 1; 
    }

    if (riskScore >= 3) return 'AT_RISK';
    if (riskScore >= 1) return 'NEEDS_ATTENTION';
    return 'HEALTHY';
  }

  private calculateTrend(
    recentUpdates: {
      moisture: number | null;
      temperature: number | null;
      humidity: number | null;
    }[],
  ): CropTrend {
    if (recentUpdates.length < 2) return 'UNKNOWN';

    const chronological = [...recentUpdates].reverse();

    const scoreOf = (u: (typeof chronological)[0]) => {
      let score = 0;
      let count = 0;
      if (u.moisture !== null) {
        score += 100 - Math.abs(55 - u.moisture);
        count++;
      }
      if (u.humidity !== null) {
        score += 100 - Math.abs(55 - u.humidity);
        count++;
      }
      return count > 0 ? score / count : null;
    };

    const scores = chronological
      .map(scoreOf)
      .filter((s): s is number => s !== null);
    if (scores.length < 2) return 'UNKNOWN';

    const delta = scores[scores.length - 1] - scores[0];
    if (delta > 5) return 'IMPROVING';
    if (delta < -5) return 'DECLINING';
    return 'STABLE';
  }

  private generateInsights(params: {
    growthStage: string;
    expectedGrowthStage: string;
    latestUpdate: {
      moisture: number | null;
      temperature: number | null;
      humidity: number | null;
    } | null;
    trend: CropTrend;
    weatherForecastRain: number | null;
  }): string[] {
    const {
      growthStage,
      expectedGrowthStage,
      latestUpdate,
      trend,
      weatherForecastRain,
    } = params;
    const insights: string[] = [];

    if (growthStage !== expectedGrowthStage) {
      insights.push(
        `Crop is currently marked as ${growthStage}, but based on planting date it would typically be at ${expectedGrowthStage}. Consider verifying the recorded stage.`,
      );
    }

    if (!latestUpdate) {
      insights.push(
        'No recent field updates recorded. Submit an update to get accurate crop health insights.',
      );
      return insights;
    }

    const { moisture, temperature } = latestUpdate;
    const isSensitiveStage = ['GERMINATION', 'FLOWERING'].includes(growthStage);

    if (moisture !== null) {
      if (moisture < 30 && isSensitiveStage) {
        insights.push(
          'Soil moisture is low during a sensitive growth stage. Monitor soil moisture closely.',
        );
      } else if (moisture < 30) {
        insights.push(
          'Soil moisture is on the lower side. Consider irrigation if conditions persist.',
        );
      } else if (moisture > 90) {
        insights.push(
          'Soil moisture is very high. Monitor the field for excess moisture and drainage issues.',
        );
      } else {
        insights.push('Moisture is currently adequate.');
      }
    }

    if (temperature !== null) {
      if (temperature > 35)
        insights.push(
          'Temperature is elevated. Watch for heat stress on the crop.',
        );
      else if (temperature < 15)
        insights.push(
          'Temperature is on the lower side, which may slow crop development.',
        );
    }

    if (
      weatherForecastRain !== null &&
      weatherForecastRain >= 70 &&
      moisture !== null &&
      moisture > 70
    ) {
      insights.push(
        'Heavy rainfall is expected and field moisture is already high. Monitor the field for excess moisture.',
      );
    }

    if (trend === 'IMPROVING')
      insights.push('Recent field updates indicate improving conditions.');
    else if (trend === 'DECLINING')
      insights.push(
        'Recent field updates indicate declining conditions. Increased monitoring is recommended.',
      );

    insights.push(
      `Crop is progressing through ${growthStage.toLowerCase().replace('_', ' ')}.`,
    );

    return insights;
  }
}
