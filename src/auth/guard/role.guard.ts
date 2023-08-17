import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    console.log('hmm');
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    return this.matchRoles(roles, user.roles);
  }

  matchRoles(roles: string[], userRoles: string[]): boolean {
    let match = false;
    userRoles.forEach((role) => {
      if (roles.includes(role)) {
        match = true;
      }
    });
    return match;
  }
}
