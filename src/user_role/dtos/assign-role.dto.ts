import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @IsUUID()
  @ApiProperty({ description: 'User Id' })
  userId: string;

  @IsUUID()
  @ApiProperty({ description: 'Role Id' })
  role: string;
}
