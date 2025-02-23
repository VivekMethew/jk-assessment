import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONFIG } from '../config/constants';
import { UserRoleService } from '../user_role/user_role.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRoleService: UserRoleService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.SECRET,
    });
  }

  async validate(payload: any) {
    const roles = await this.userRoleService.getRolesByUserId(payload.sub);
    return {
      userId: payload.sub,
      username: payload.username,
      roles,
    };
  }
}
