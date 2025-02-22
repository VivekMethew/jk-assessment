import { UserStatus } from '../../types/types';
import { BaseEntity } from '../../common/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import { UserRoles } from './user-role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
    nullable: false,
  })
  status: UserStatus;

  @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
  userRoles: UserRoles[];

  static toDto(userObj: User) {
    const userDto = new UserDto();
    userDto.id = userObj.id;
    userDto.firstName = userObj.firstName;
    userDto.lastName = userObj.lastName;
    userDto.email = userObj.email;
    userDto.phone = userObj.phone;
    userDto.bio = userObj.bio;
    userDto.status = userObj.status;
    userDto.createdAt = userObj.createdAt;
    userDto.updatedAt = userObj.updatedAt;
    userDto.deletedAt = userObj.deletedAt;

    console.log({ userObj, userDto });
    return userDto;
  }
}
