import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    );

    if (!(requiredRole.length > 0)) return false;

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const decoded = this.jwtService.decode(token) as any;

    const isRoleMatching = requiredRole.some((role) =>
      decoded.role?.includes(role),
    );

    if (!isRoleMatching) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
