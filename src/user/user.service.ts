import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserrDto } from './dtos/user-create.dto';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  public async findByEmailId(email: string): Promise<User | null> {
    return this.dataSource
      .createQueryBuilder(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
  }

  // Create User
  async create(createUserDto: CreateUserrDto): Promise<UserDto> {
    const userExist = await this.findByEmailId(createUserDto.email);

    if (userExist) {
      throw new BadRequestException('User already used in email id');
    }

    const userCreate = new User();
    userCreate.firstName = createUserDto?.firstName || '';
    userCreate.lastName = createUserDto.lastName || '';
    userCreate.email = createUserDto.email;
    userCreate.password = createUserDto.password;

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(userCreate)
      .execute();

    return User.toDto(userCreate);
  }

  // GET Users
  async getAll(): Promise<UserDto[]> {
    const users = await this.dataSource
      .createQueryBuilder(User, 'user')
      .select()
      .getMany();
    return users.map((user) => User.toDto(user));
  }

  // Get User
  async getUser(userId: string): Promise<UserDto> {
    const user = await this.dataSource
      .createQueryBuilder(User, 'user')
      .where('user.id = :userId', { userId })
      .getOne()
      .catch((error) => {
        throw new BadRequestException('User not found');
      });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return User.toDto(user);
  }

  async findByEmail(email: string, password: string) {
    try {
      const user = await this.dataSource
        .createQueryBuilder(User, 'user')
        .where('user.email = :email', { email })
        .getOne();

      if (!user) {
        throw new UnauthorizedException();
      }

      if (user.password !== password) {
        throw new UnauthorizedException(
          'Please check your username and password, and try again',
        );
      }
      return { email: user.email, id: user.id, status: user.status };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'Please check your username and password, and try again',
      );
    }
  }
}
