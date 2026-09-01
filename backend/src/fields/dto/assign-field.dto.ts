import { IsString, IsNotEmpty } from 'class-validator';

export class AssignFieldDto {
  @IsString()
  @IsNotEmpty()
  agentId: string;
}
