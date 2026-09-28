import { cropIntelligenceDto } from 'src/crop-intelligence/dto/crop-intelligence.dto';
import { RecommendationItemDto } from './dto/recommendation-response.dto';

export function generateRecommendations(
  intelligence:cropIntelligenceDto,
  weatherForecastRain: number | null,
): RecommendationItemDto[] {
  const recommendations: RecommendationItemDto[] = [];
  const { moisture, temperature } = intelligence.metrics;

  
  if (moisture !== null && moisture < 15) {
    recommendations.push({
      situation: 'Soil moisture is critically low.',
      recommendation:
        'Irrigate the field immediately and monitor soil moisture closely over the next few days.',
      priority: 'HIGH',
    });
  } else if (moisture !== null && moisture < 30) {
    recommendations.push({
      situation: 'Soil moisture is low.',
      recommendation:
        'Irrigate the field and monitor soil moisture closely over the next few days.',
      priority: 'MEDIUM',
    });
  }

  
  if (temperature !== null && temperature > 35) {
    recommendations.push({
      situation: 'Temperature is unusually high.',
      recommendation:
        'Increase monitoring frequency and consider additional irrigation to offset heat stress.',
      priority: 'HIGH',
    });
  }

  
  if (intelligence.stageComparison === 'BEHIND') {
    recommendations.push({
      situation: `Crop is behind schedule: currently ${intelligence.growthStage}, expected ${intelligence.expectedGrowthStage}.`,
      recommendation:
        'Inspect the field to determine why crop development is behind the expected stage and take appropriate action.',
      priority: 'HIGH',
    });
  }

  
  if (
    weatherForecastRain !== null &&
    weatherForecastRain >= 70 &&
    moisture !== null &&
    moisture > 70
  ) {
    recommendations.push({
      situation:
        'Heavy rainfall is expected and field moisture is already high.',
      recommendation:
        'Delay irrigation and monitor the field for excess moisture or drainage issues.',
      priority: 'MEDIUM',
    });
  }

  
  if (intelligence.trend === 'DECLINING') {
    recommendations.push({
      situation: 'Recent field updates show declining conditions over time.',
      recommendation:
        'Inspect the field in person to identify the cause before conditions worsen further.',
      priority: 'HIGH',
    });
  }

  
  if (recommendations.length === 0) {
    recommendations.push({
      situation: 'Conditions are within normal ranges.',
      recommendation: 'Continue current field management practices.',
      priority: 'LOW',
    });
  }

  return recommendations;
}
