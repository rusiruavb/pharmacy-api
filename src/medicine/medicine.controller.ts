import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRole, RolePermission } from 'src/types';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { DeleteMedicineDto } from './dto/delete-medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('create')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER])
  @SetMetadata('permissions', [RolePermission.CREATE_MEDICINE])
  createUser(@Body() input: CreateMedicineDto) {
    return this.medicineService.createMedicine(input);
  }

  @Get(':id')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.CASHIER,
    UserRole.CUSTOMER,
  ])
  @SetMetadata('permissions', [RolePermission.READ_MEDICINE])
  getMedicine(@Param('id') input: number) {
    return this.medicineService.getMedicineById(input);
  }

  @Get()
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [
    UserRole.OWNER,
    UserRole.MANAGER,
    UserRole.CASHIER,
    UserRole.CUSTOMER,
  ])
  @SetMetadata('permissions', [RolePermission.READ_MEDICINES])
  getMedicines() {
    return this.medicineService.getMedicines();
  }

  @Put('update')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER, UserRole.MANAGER, UserRole.CASHIER])
  @SetMetadata('permissions', [RolePermission.UPDATE_MEDICINE])
  updateMedicine(@Body() input: UpdateMedicineDto) {
    return this.medicineService.updateMedicine(input);
  }

  @Delete('remove')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER, UserRole.MANAGER])
  @SetMetadata('permissions', [RolePermission.SOFT_DELETE_MEDICINE])
  removeMedicine(@Body() input: DeleteMedicineDto) {
    return this.medicineService.softDeleteMedicine(input);
  }

  @Delete('delete')
  @UseGuards(RoleGuard, PermissionsGuard)
  @SetMetadata('role', [UserRole.OWNER])
  @SetMetadata('permissions', [RolePermission.DELETE_MEDICINE])
  deleteMedicine(@Body() input: DeleteMedicineDto) {
    return this.medicineService.hardDeleteMedicine(input);
  }
}
