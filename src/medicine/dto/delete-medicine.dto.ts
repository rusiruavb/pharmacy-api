import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteMedicineDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
