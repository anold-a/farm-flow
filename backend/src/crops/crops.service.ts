import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculateExpectedStage } from './utils/growth-stage.util';
import { Role } from '@prisma/client';
import { AuthenticatedUser } from 'src/auth/types/authenticated-user.type';

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


  async findActiveByField(fieldId: string, currentUser: AuthenticatedUser) {
  const field = await this.prisma.field.findUnique({
    where: { id:fieldId},
  });

  if (!field) {
    throw new BadRequestException('Field not found');
  }

  if (
    currentUser.role === Role.AGENT &&
    field.assignedAgentId!== currentUser.id
  ) {
    throw new BadRequestException('You do not have access to this field');
  }

  return this.prisma.crop.findFirst({
    where: {
      fieldId,
      growthStage: {  not: 'HARVESTED' },
    },
    orderBy: { createdAt: 'desc' },
  });
}

async findHistoryByField(fieldId: string, currentUser: AuthenticatedUser) {
  if (currentUser.role === Role.ADMIN) {
    throw new BadRequestException(
      'Only administrators can view crop history',
    );
  }

  const field = await this.prisma.field.findUnique({
    where: { id:fieldId},
  });

  if (!field) {
    throw new BadRequestException('Field not found');
  }

  return this.prisma.crop.findMany({
    where: { fieldId },
    orderBy: { createdAt: 'desc' },
  });
}
    
  }

