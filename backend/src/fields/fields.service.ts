import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { AuditService } from '../audit/audit.service'; 

@Injectable()
export class FieldsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly auditService: AuditService,
  ) {}

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

    const createdField = await this.prisma.field.create({
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

    await this.auditService.log(userId, 'CREATE', 'FIELD', createdField.id);
    return createdField;
  }

  async findAll(currentUser: { id: string; role: 'ADMIN' | 'AGENT' }) {
    const where =
      currentUser.role === Role.ADMIN
        ? {}
        : await this.agentWhere(currentUser.id);

    return this.prisma.field.findMany({
       where: { isDemo: false }, 
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
      field.assignedAgentId !== currentUser.id &&
      !field.isDemo
    ) {
      throw new ForbiddenException('You do not have access to this field');
    }

    return field;
  }

  async update(
    id: string,
    data: Partial<CreateFieldDto>,
    currentUser: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    if (currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only administrators can update fields');
    }

    const field = await this.prisma.field.findUnique({ where: { id } });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    if (data.assignedAgentId) {
      const agent = await this.prisma.user.findUnique({
        where: { id: data.assignedAgentId },
      });

      if (!agent) {
        throw new BadRequestException('Assigned agent not found');
      }

      if (agent.role !== Role.AGENT) {
        throw new BadRequestException(
          'A field can only be assigned to an AGENT',
        );
      }
    }

    const updatedField = await this.prisma.field.update({
      where: { id },
      data,
      include: {
        createdBy: {
          select: { id: true, fullName: true, email: true, role: true },
        },
        assignedAgent: {
          select: { id: true, fullName: true, email: true, role: true },
        },
      },
    });
    await this.auditService.log(currentUser.id, 'UPDATE', 'FIELD', id);

    return updatedField;
  }

  async remove(
    id: string,
    currentUser: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    if (currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only administrators can delete fields');
    }

    const field = await this.prisma.field.findUnique({ where: { id } });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    await this.prisma.field.delete({ where: { id } });
    await this.auditService.log(currentUser.id, 'DELETE', 'FIELD', id);
    return field;
  }

  async findMyFields(currentUser: { id: string; role: 'ADMIN' | 'AGENT' }) {
    return this.prisma.field.findMany({
      where: await this.agentWhere(currentUser.id),
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

  async findMyFieldById(
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

    if (!field || (field.assignedAgentId !== currentUser.id && !field.isDemo)) {
      throw new NotFoundException('Field not found');
    }

    return field;
  }

  async assignAgent(
    fieldId: string,
    agentId: string,
    currentUser: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    if (currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only administrators can assign agents');
    }

    const field = await this.prisma.field.findUnique({
      where: { id: fieldId },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    const agent = await this.prisma.user.findUnique({ where: { id: agentId } });

    if (!agent) {
      throw new BadRequestException('Agent not found');
    }

    if (agent.role !== Role.AGENT) {
      throw new BadRequestException(
        'A field can only be assigned to a user with role AGENT',
      );
    }

    const updatedField = await this.prisma.field.update({
      where: { id: fieldId },
      data: { assignedAgentId: agent.id },
      include: {
        createdBy: {
          select: { id: true, fullName: true, email: true, role: true },
        },
        assignedAgent: {
          select: { id: true, fullName: true, email: true, role: true },
        },
      },
    });

    await this.notificationsService.create(
      agent.id,
      'New Field Assigned',
      `You have been assigned to field ${field.name}.`,
      'FIELD_ASSIGNED',
    );

    await this.auditService.log(currentUser.id, 'ASSIGN', 'FIELD', fieldId);

    return updatedField;
  }

  async unassignAgent(
    fieldId: string,
    currentUser: { id: string; role: 'ADMIN' | 'AGENT' },
  ) {
    if (currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only administrators can unassign agents');
    }

    const field = await this.prisma.field.findUnique({
      where: { id: fieldId },
    });

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    const updatedField = await this.prisma.field.update({
      where: { id: fieldId },
      data: { assignedAgentId: null },
      include: {
        createdBy: {
          select: { id: true, fullName: true, email: true, role: true },
        },
        assignedAgent: {
          select: { id: true, fullName: true, email: true, role: true },
        },
      },
    });
    await this.auditService.log(currentUser.id, 'REMOVE', 'FIELD', fieldId);
    return updatedField;
  }

  private async agentWhere(userId: string) {
    const hasReal = await this.prisma.field.count({
      where: { assignedAgentId: userId, isDemo: false },
    });
    return hasReal > 0
      ? { assignedAgentId: userId }
      : { OR: [{ assignedAgentId: userId }, { isDemo: true }] };
  }
}
