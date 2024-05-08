import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { Medicine } from './medicine.entity';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { DeleteMedicineDto } from './dto/delete-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(private readonly dataSource: DataSource) {}

  async createMedicine(input: CreateMedicineDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const medicine = queryRunner.manager.create(Medicine, {
        name: input.name,
        description: input.description,
        quantity: input.quantity,
        price: input.price,
      });

      await queryRunner.manager.insert(Medicine, medicine);

      await queryRunner.commitTransaction();

      return {
        id: medicine.id,
        name: medicine.name,
        description: medicine.description,
        quantity: medicine.quantity,
        price: medicine.price,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(JSON.stringify(error)),
      });
    } finally {
      await queryRunner.release();
    }
  }

  async getMedicineById(id: number) {
    try {
      const medicine = await this.dataSource.manager.findOne(Medicine, {
        where: { id },
      });

      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }

      return medicine;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(JSON.stringify(error)),
      });
    }
  }

  async getMedicines() {
    try {
      return await this.dataSource.getRepository(Medicine).find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(JSON.stringify(error)),
      });
    }
  }

  async updateMedicine(input: UpdateMedicineDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const medicine = await queryRunner.manager.findOne(Medicine, {
        where: { id: input.id },
      });

      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }

      await queryRunner.manager.update(
        Medicine,
        { id: input.id },
        {
          name: input.name,
          description: input.description,
          quantity: input.quantity,
          price: input.price,
        },
      );

      await queryRunner.commitTransaction();

      return {
        dateTime: new Date(),
        message: 'Medicine updated successfully',
      };
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

  async softDeleteMedicine(input: DeleteMedicineDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const medicine = await this.dataSource.manager.findOne(Medicine, {
        where: { id: input.id },
      });

      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }

      await this.dataSource.manager.softRemove(Medicine, { id: medicine.id });

      await queryRunner.commitTransaction();

      return {
        message: 'Medicine deleted successfully',
        date: new Date(),
      };
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

  async hardDeleteMedicine(input: DeleteMedicineDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const medicine = await this.dataSource.manager.findOne(Medicine, {
        where: { id: input.id },
      });

      if (!medicine) {
        throw new NotFoundException('Medicine not found');
      }

      await this.dataSource.manager.delete(Medicine, { id: medicine.id });

      await queryRunner.commitTransaction();

      return {
        message: 'Medicine deleted successfully',
        date: new Date(),
      };
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
