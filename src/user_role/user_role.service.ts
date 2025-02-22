import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRoles } from 'src/user/entities/user-role.entity';
import { DataSource } from 'typeorm';
import { AssignRoleDto } from './dtos/assign-role.dto';
import { convertIdToObject } from 'src/common/getObject';
import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/lookup/entities/role.entity';

@Injectable()
export class UserRoleService {
  constructor(private readonly dataSource: DataSource) {}

  async getRolesByUserId(userId: string) {
    return this.dataSource
      .createQueryBuilder('user_roles', 'user_role')
      .leftJoin('user_role.role', 'role')
      .select('role.id', 'role')
      .addSelect('role.key', 'key')
      .addSelect('role.name', 'name')
      .where('user_role.userId = :userId', { userId })
      .getRawMany();
  }

  async findAllUserRoles(userId: string) {
    return this.dataSource
      .createQueryBuilder('user_roles', 'user_role')
      .leftJoin('user_role.role', 'role')
      .select('role.id', 'role')
      .addSelect('role.key', 'key')
      .addSelect('role.name', 'name')
      .where('user_role.userId = :userId', { userId })
      .getRawMany();
  }

  async assignRoleToUser(assignRoleDto: AssignRoleDto) {
    const userRoles = await this.getRolesByUserId(assignRoleDto.userId);

    if (userRoles.length > 0) {
      const userRole = userRoles.find(
        (userRole) => userRole.role === assignRoleDto.role,
      );
      if (userRole) {
        throw new BadRequestException('Role already assigned to user');
      }
    }

    const userRole = new UserRoles();
    userRole.user = convertIdToObject<User>(assignRoleDto.userId, User);
    userRole.role = convertIdToObject<Roles>(assignRoleDto.role, Roles);

    try {
      await this.dataSource.manager.save(userRole);
      return { message: 'Role assigned to user successfully' };
    } catch (error) {
      throw new BadRequestException('Error assigning role to user');
    }
  }
}
