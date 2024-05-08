import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './user.entity';
import { Role } from 'src/role/role.entity';

@Injectable()
export class UserService {
  saltOrRounds = 10;

  constructor(private readonly dataSource: DataSource) {}

  async createUser(input: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const role = await queryRunner.manager.findOne(Role, {
        where: { id: input.roleId },
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      const hashedPwd = await bcrypt.hash(input.password, this.saltOrRounds);
      const user = queryRunner.manager.create(User, {
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNumber: input.phoneNumber,
        userName: input.userName,
        password: hashedPwd,
        role: role,
      });

      await queryRunner.manager.insert(User, user);

      await queryRunner.commitTransaction();

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        userName: user.userName,
        role: role,
      };
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

  async getUserById(input: GetUserDto) {
    try {
      const user = await this.dataSource.manager.findOne(User, {
        where: {
          userName: input.userId,
        },
        select: ['id', 'firstName', 'lastName', 'phoneNumber', 'userName'],
        relations: ['role'],
      });

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        userName: user.userName,
        role: user.role,
      };
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

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.dataSource.manager.find(User, {
        select: ['id', 'firstName', 'lastName', 'phoneNumber', 'userName'],
        relations: ['role'],
      });

      return users;
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

  async updateUser(input: UpdateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const role = await queryRunner.manager.findOne(Role, {
        where: { id: input.roleId },
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      let password: string;

      if (input.password) {
        password = await bcrypt.hash(input.password, this.saltOrRounds);
        await queryRunner.manager.update(
          User,
          { id: input.id },
          {
            firstName: input.firstName,
            lastName: input.lastName,
            phoneNumber: input.phoneNumber,
            userName: input.userName,
            password: password,
            role: role,
          },
        );
      } else {
        await queryRunner.manager.update(
          User,
          { id: input.id },
          {
            firstName: input.firstName,
            lastName: input.lastName,
            phoneNumber: input.phoneNumber,
            userName: input.userName,
            role: role,
          },
        );
      }

      await queryRunner.commitTransaction();

      return {
        dateTime: new Date(),
        message: 'User updated successfully',
      };
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

  async softDeleteUser(input: DeleteUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const user = await this.dataSource.manager.findOne(User, {
        where: { id: input.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.dataSource.manager.softRemove(User, { id: user.id });

      await queryRunner.commitTransaction();

      return {
        message: 'User deleted successfully',
        date: new Date(),
      };
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

  async hardDeleteUser(input: DeleteUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const user = await this.dataSource.manager.findOne(User, {
        where: { id: input.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.dataSource.manager.delete(User, { id: user.id });

      await queryRunner.commitTransaction();

      return {
        message: 'User deleted successfully',
        date: new Date(),
      };
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
}
