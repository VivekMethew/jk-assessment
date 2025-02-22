import { BaseEntity } from 'src/common/entities/base.entity';
import { UserRoles } from '../../user/entities/user-role.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class Roles extends BaseEntity {
  @Column({ unique: true })
  key: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  remark: string;

  @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
  userRoles: UserRoles[];
}
