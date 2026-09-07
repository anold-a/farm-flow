import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculateExpectedStage } from './utils/growth-stage.util';
import { Role } from '@prisma/client';

@Injectable()
export class CropsService {
  constructor(private readonly prisma: PrismaService,
    
    ) {}
  

  async create(data: CreateCropDto, fieldId: string,userId:string) {
    const field = await this.prisma.field.findUnique({
      where: {
        id: fieldId,
      },
    });

    if (!field) {
      throw new BadRequestException('Field Not Found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('Authenticated user not found');
    }

    if (user.role !== Role.ADMIN) {
      throw new BadRequestException('Only administrators can create a crop');
    }

    

    return this.prisma.crop.create({
      data: {
        name: data.name,
        variety:data.variety,
        plantingDate:data.plantingDate,
        expectedHarvestDate:data.expectedHarvestDate,
        fieldId:fieldId,
        growthStage:calculateExpectedStage(data.plantingDate)
      },

    });
  }
}
