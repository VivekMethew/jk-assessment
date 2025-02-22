import { IsEmail, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../types/types';

export class UserDto {
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @IsString()
  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  lastName?: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Short bio of the user',
    example: 'Software Developer at XYZ Company',
    required: false,
  })
  bio?: string;

  @IsString()
  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1-234-567-890',
    required: false,
  })
  phone?: string;

  @IsString()
  @ApiProperty({
    description: 'Status of the user',
    example: 'ACTIVE',
    enum: UserStatus,
  })
  status: UserStatus;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2024-11-27T12:34:56Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    example: '2025-02-22T12:34:56Z',
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Date when the user was deleted (null if not deleted)',
    example: '2025-01-01T12:34:56Z',
    type: Date,
    required: false,
  })
  deletedAt?: Date;
}
