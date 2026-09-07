import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  IsDate
} from 'class-validator';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
  variety: string;

  
  @IsNotEmpty()
  @IsDate()
  plantingDate: Date;

  @IsDate()
  @IsNotEmpty()
  expectedHarvestDate:Date;


  @IsUUID()
  currentUser: string;
}
