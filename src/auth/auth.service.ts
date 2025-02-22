import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dtos/register.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly service: UserService,
    private dataSource: DataSource,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.service.findByEmail(email, password);
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { username: user.email, sub: user.id, roles: [] };
    return { user, access_token: this.jwtService.sign(payload) };
  }

  async register(registerDto: RegisterDto) {
    const userExist = await this.service.findByEmailId(registerDto.email);

    if (userExist) {
      throw new BadRequestException('User already used in email id');
    }

    const userCreate = new User();
    userCreate.firstName = registerDto?.firstName || '';
    userCreate.lastName = registerDto.lastName || '';
    userCreate.email = registerDto.email;
    userCreate.password = registerDto.password;

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(userCreate)
      .execute();

    return { message: 'User created successfully', user: userCreate };
  }
}
