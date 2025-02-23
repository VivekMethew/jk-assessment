import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../types/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const { user } = context.switchToHttp().getRequest();
    const roles = user.roles.map((role: any) => role.key);

    if (roles.length > 0 && roles.includes(UserRole.SUPER_ADMIN)) {
      return true;
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return false;
    }
    return requiredRoles.some((role: any) => roles?.includes(role));
  }
}
