import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateFieldUpdateDto {
  @IsUUID()
  fieldId: string;

  @IsString()
  @IsNotEmpty()
  cropStage: string;

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
