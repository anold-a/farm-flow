import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  IsEnum,
} from 'class-validator';
import { GrowthStage } from '@prisma/client';

export class CreateFieldUpdateDto {
  @IsUUID()
  fieldId: string;

  @IsEnum(GrowthStage)
  cropStage: GrowthStage;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  moisture?: number;

  @IsOptional()
  @IsNumber()
  temperature?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  humidity?: number;
}
