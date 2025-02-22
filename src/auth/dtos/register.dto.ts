import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'john@123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
