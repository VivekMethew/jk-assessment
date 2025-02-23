import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../gourds/jwt-auth.gourd';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../gourds/roles.gourd';
import { UserRole } from '../types/types';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Roles([UserRole.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all users',
    type: [UserDto],
  })
  async getAll(): Promise<UserDto[]> {
    return await this.service.getAll();
  }

  @Get('profile')
  @Roles([UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a user by userid' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get user',
    type: UserDto,
  })
  async getUser(@Request() req): Promise<UserDto> {
    const userId = req.user.userId;
    return this.service.getUser(userId);
  }
}
