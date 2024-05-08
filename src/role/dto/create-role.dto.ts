import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  permissionIds: number[];
}
