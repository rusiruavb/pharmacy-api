import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dataSOurce: DataSource) {}

  async createUser(input: CreateUserDto) {
    return input;
  }

  async getUserById(input: GetUserDto) {
    return input;
  }

  async getAllUsers() {
    return [];
  }

  async updateUser(input: UpdateUserDto) {
    return input;
  }

  async softDeleteUser(input: DeleteUserDto) {
    return input;
  }

  async hardDeleteUser(input: DeleteUserDto) {
    return input;
  }
}
