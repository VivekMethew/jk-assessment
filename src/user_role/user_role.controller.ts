import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/types/types';
import { JwtAuthGuard } from 'src/gourds/jwt-auth.gourd';
import { RolesGuard } from 'src/gourds/roles.gourd';
import { AssignRoleDto } from './dtos/assign-role.dto';

@ApiTags('user-roles')
@Controller('user-roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Get()
  @Roles([UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All user roles' })
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.service.findAllUserRoles(userId);
  }

  @Put()
  @Roles([UserRole.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign the role to user' })
  assiignRoleToUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.service.assignRoleToUser(assignRoleDto);
  }
}
