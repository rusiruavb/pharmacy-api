import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/types';
import { AttachPermissionToRoleDto } from './dto/attach-permission-to-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  async createRole(@Body() input: CreateRoleDto) {
    return this.roleService.createRole(input);
  }

  @Get()
  async getRoles() {
    return this.roleService.getRoles();
  }

  @Put('attachpermission')
  @UseGuards(RoleGuard)
  @SetMetadata('role', [UserRole.OWNER])
  async attachPermission(@Body() input: AttachPermissionToRoleDto) {
    return this.roleService.attachPermissionToRole(input);
  }
}
