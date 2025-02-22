import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({
    description: 'Unique key representing the role',
    example: 'ADMIN',
  })
  key: string;

  @ApiProperty({
    description: 'Name of the role',
    example: 'Administrator',
  })
  name: string;

  @ApiProperty({
    description: 'Optional remark for the role',
    example: 'This role has all privileges',
    required: false,
  })
  remark: string;
}
