import { Injectable, ForbiddenException,NotFoundException } from '@nestjs/common';

import { Role } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateFieldUpdateDto } from './dto/create-field-update.dto';

import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Injectable()
export class FieldUpdatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFieldUpdateDto, currentUser: AuthenticatedUser) {
    const field = await this.prisma.field.findUnique({
      where: {
        id: data.fieldId,
      },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    if (
      currentUser.role === Role.AGENT &&
      field.assignedAgentId !== currentUser.id
    ) {
      throw new ForbiddenException(
        'You cannot update a field that is not assigned to you',
      );
    }

    return this.prisma.fieldUpdate.create({
      data: {
        cropStage: data.cropStage,
        notes: data.notes,
        moisture: data.moisture,
        temperature: data.temperature,
        humidity: data.humidity,

        fieldId: data.fieldId,
        userId: currentUser.id,
      },

      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },

        field: {
          select: {
            id: true,
            name: true,
            crop: true,
          },
        },
      },
    });
  }

  async findByField(fieldId: string, currentUser: AuthenticatedUser) {
    const field = await this.prisma.field.findUnique({
      where: {
        id: fieldId,
      },
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

    return this.prisma.fieldUpdate.findMany({
      where: {
        fieldId,
      },

      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
