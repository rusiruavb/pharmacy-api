import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MedicineModule } from './medicine/medicine.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Role } from './user/role.entity';
import { Permission } from './user/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/pharmacydb',
      synchronize: true,
      entities: [User, Role, Permission],
    }),
    UserModule,
    AuthModule,
    MedicineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
