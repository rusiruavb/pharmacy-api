import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.dataSource.manager.findOne(User, {
        where: { userName: username },
        select: ['id', 'userName', 'password'],
        relations: ['role', 'role.permissions'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPwdValid = await bcrypt.compare(password, user.password);

      if (!isPwdValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const jwtPayload = {
        sub: user.userName,
        role: user.role.name,
        permissions: user.role.permissions.map((p) => p.name),
      };

      return {
        access_token: this.jwtService.sign(jwtPayload),
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
}
