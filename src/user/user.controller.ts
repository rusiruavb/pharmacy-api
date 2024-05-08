import { Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { RolePermission, UserRole } from 'src/types';

@Controller('user')
export class UserController {
  @Post('create')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.MANAGER, UserRole.OWNER])
  @SetMetadata('permissions', [RolePermission.CREATE_USER])
  createUser() {
    return 'User created successfully';
  }
}
