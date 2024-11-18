import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './authGuard';
import { ConfigService } from '../config/config.service';
import { UsersService } from "src/users/users.service";

@Injectable()
export class RoleGuard extends AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    configService: ConfigService,
    userService: UsersService
  ) {
    super(configService, userService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context); // Awaiting the parent guard's canActivate
    if (!isAuth) return false;

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have the required role to access this resource');
    }

    return true;
  }
}
