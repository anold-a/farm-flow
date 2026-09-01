import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  crop: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  location: string;

  @IsNumber()
  @Min(0.01)
  acreage: number;

  @IsString()
  @IsIn(['Healthy', 'Needs Attention', 'Critical', 'Harvested'])
  status: string;

  @IsOptional()
  @IsUUID()
  assignedAgentId?: string;
}
