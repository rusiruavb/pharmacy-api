import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { RolePermission, UserRole } from 'src/types';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.MANAGER, UserRole.OWNER])
  @SetMetadata('permissions', [RolePermission.CREATE_USER])
  createUser(@Body() input: CreateUserDto) {
    return this.userService.createUser(input);
  }

  @Get()
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER])
  @SetMetadata('permissions', [RolePermission.READ_USER])
  getUser(@Body() input: GetUserDto) {
    return this.userService.getUserById(input);
  }

  @Get('all')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER])
  @SetMetadata('permissions', [RolePermission.READ_USERS])
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Put('update')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER, UserRole.MANAGER, UserRole.CASHIER])
  @SetMetadata('permissions', [RolePermission.UPDATE_USER])
  updateUser(@Body() input: UpdateUserDto) {
    return this.userService.updateUser(input);
  }

  @Delete('remove')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER, UserRole.MANAGER])
  @SetMetadata('permissions', [RolePermission.SOFT_DELETE_USER])
  removeUser(@Body() input: DeleteUserDto) {
    return this.userService.softDeleteUser(input);
  }

  @Delete('delete')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER])
  @SetMetadata('permissions', [RolePermission.DELETE_USER])
  deleteUser(@Body() input: DeleteUserDto) {
    return this.userService.hardDeleteUser(input);
  }
}
