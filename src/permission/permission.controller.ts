import { Body, Controller, Post, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  async createPermission(@Body() input: CreatePermissionDto) {
    return this.permissionService.createPermission(input);
  }

  @Get()
  async getPermissions() {
    return this.permissionService.getPermissions();
  }
}
