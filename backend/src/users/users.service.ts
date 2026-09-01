import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    return this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        role: data.role ?? 'AGENT',
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, data: Partial<CreateUserDto>) {
    const user = await this.findById(id);

    const updateData: {
      fullName?: string;
      email?: string;
      password?: string;
      role?: 'ADMIN' | 'AGENT';
    } = {};

    if (data.fullName) {
      updateData.fullName = data.fullName;
    }

    if (data.email) {
      updateData.email = data.email;
    }

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    if (data.role) {
      updateData.role = data.role;
    }

    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: updateData,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });
  }
}
