import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

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
}
