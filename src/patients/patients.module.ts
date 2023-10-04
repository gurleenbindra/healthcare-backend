import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './model/patients.schema'
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),AuthModule],
  providers: [PatientsService],
  controllers: [PatientsController]
})
export class PatientsModule { }
