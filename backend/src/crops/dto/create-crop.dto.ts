import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  IsDate
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  variety: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  plantingDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  expectedHarvestDate: Date;

}
