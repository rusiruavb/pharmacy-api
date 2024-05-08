import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { Permission } from 'src/permission/permission.entity';
import { AttachPermissionToRoleDto } from './dto/attach-permission-to-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  async createRole(input: CreateRoleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const permissions = await queryRunner.manager.findBy(Permission, {
        id: In(input.permissionIds),
      });

      const role = queryRunner.manager.create(Role, {
        name: input.name,
        description: input.description,
        permissions: permissions,
      });

      await queryRunner.manager.save(Role, role);

      await queryRunner.commitTransaction();

      return role;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(JSON.stringify(error)),
      });
    } finally {
      await queryRunner.release();
    }
  }

  async getRoles() {
    try {
      return await this.dataSource.manager.find(Role, {
        relations: ['permissions'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(JSON.stringify(error)),
      });
    }
  }

  async attachPermissionToRole({
    roleId,
    permissionId,
  }: AttachPermissionToRoleDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const role = await queryRunner.manager.findOne(Role, {
        where: { id: roleId },
        select: ['id', 'permissions'],
        relations: ['permissions'],
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      const permission = await queryRunner.manager.findOne(Permission, {
        where: { id: permissionId },
      });

      if (!permission) {
        throw new NotFoundException('Permission not found');
      }

      role.permissions.push(permission);

      await queryRunner.manager.save(Role, role);

      await queryRunner.commitTransaction();

      return role;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(JSON.stringify(error)),
      });
    } finally {
      await queryRunner.release();
    }
  }
}
