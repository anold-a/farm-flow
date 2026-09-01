import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFieldDto } from './dto/create-field.dto';

@Injectable()
export class FieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFieldDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('Authenticated user not found');
    }

    if (user.role !== Role.ADMIN) {
      throw new BadRequestException('Only administrators can register fields');
    }

    let assignedAgentId: string | null = null;

    if (data.assignedAgentId) {
      const agent = await this.prisma.user.findUnique({
        where: {
          id: data.assignedAgentId,
        },
      });

      if (!agent) {
        throw new BadRequestException('Assigned agent not found');
      }

      if (agent.role !== Role.AGENT) {
        throw new BadRequestException(
          'A field can only be assigned to an AGENT',
        );
      }

      assignedAgentId = agent.id;
    }

    return this.prisma.field.create({
      data: {
        name: data.name,
        crop: data.crop,
        location: data.location,
        acreage: data.acreage,
        status: data.status,

        createdById: user.id,

        assignedAgentId,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },

        assignedAgent: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll(currentUser: { id: string; role: 'ADMIN' | 'AGENT' }) {
    const where =
      currentUser.role === Role.ADMIN
        ? {}
        : { assignedAgentId: currentUser.id };

    return this.prisma.field.findMany({
      where,
      include: {
        createdBy: {
          select: { id: true, fullName: true, email: true, role: true },
        },
        assignedAgent: {
          select: { id: true, fullName: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(
    id: string,
    currentUser: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    const field = await this.prisma.field.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, fullName: true, email: true, role: true },
        },
        assignedAgent: {
          select: { id: true, fullName: true, email: true, role: true },
        },
      },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    if (
      currentUser.role !== Role.ADMIN &&
      field.assignedAgentId !== currentUser.id
    ) {
      throw new ForbiddenException('You do not have access to this field');
    }

    return field;
  }
}
