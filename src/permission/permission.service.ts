import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(private readonly dataSource: DataSource) {}

  async createPermission(input: CreatePermissionDto): Promise<Permission> {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const permission = queryRunner.manager.create(Permission, {
        name: input.name,
        description: input.description,
      });

      await queryRunner.manager.insert(Permission, permission);

      await queryRunner.commitTransaction();

      return permission;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(JSON.stringify(error)),
      });
    } finally {
      await queryRunner.release();
    }
  }

  async getPermissions() {
    try {
      return await this.dataSource.manager.find(Permission);
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
}
