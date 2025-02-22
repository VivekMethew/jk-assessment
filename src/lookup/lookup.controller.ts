import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LookupService } from './lookup.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/types/types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dtos/role.dto';
import { JwtAuthGuard } from 'src/gourds/jwt-auth.gourd';
import { RolesGuard } from 'src/gourds/roles.gourd';

@ApiTags('lookups')
@Controller('lookups')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LookupController {
  constructor(private readonly service: LookupService) {}

  @Get()
  @Roles([UserRole.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Get all roles successfully',
    type: [RoleDto],
  })
  async getAll(): Promise<RoleDto[]> {
    return this.service.getAll();
  }
}
