import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
  imports: [UserModule, AuthModule, MedicineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
