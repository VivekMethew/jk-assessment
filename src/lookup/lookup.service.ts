import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleDto } from './dtos/role.dto';
import { DataSource } from 'typeorm';
import { Roles } from './entities/role.entity';

@Injectable()
export class LookupService {
  constructor(private readonly dataSource: DataSource) {}

  async getAll(): Promise<RoleDto[]> {
    const roles = await this.dataSource
      .createQueryBuilder(Roles, 'role')
      .getRawMany()
      .catch((error) => {
        throw new BadRequestException('Error while fetching roles');
      });
    return roles;
  }
}
