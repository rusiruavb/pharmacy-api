import { IsNotEmpty, IsNumber } from 'class-validator';

export class AttachPermissionToRoleDto {
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsNumber()
  @IsNotEmpty()
  permissionId: number;
}
