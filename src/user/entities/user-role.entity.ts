import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Roles } from '../../lookup/entities/role.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class UserRoles extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Roles, (role) => role.userRoles, { onDelete: 'CASCADE' })
  role: Roles;
}
