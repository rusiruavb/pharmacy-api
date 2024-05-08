import { Body, Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { RolePermission, UserRole } from 'src/types';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  // @UseGuards(RoleGuard, PermissionsGuard)
  // @SetMetadata('role', [UserRole.MANAGER, UserRole.OWNER])
  // @SetMetadata('permissions', [RolePermission.CREATE_USER])
  createUser(@Body() input: CreateUserDto) {
    return this.userService.createUser(input);
  }
}
