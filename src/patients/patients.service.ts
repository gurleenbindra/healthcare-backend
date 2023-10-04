import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { Patient } from './model/patients.schema'

@Injectable()
export class PatientsService {
  constructor(@InjectModel('Patient') private patientModel: Model<Patient>,
  ) { }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const patient = new this.patientModel(createPatientDto);
      return await patient.save();
    } catch (error) {
      throw new Error('Unable to create a patient.');
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return this.patientModel.find().exec();
    } catch (error) {
      throw new Error('Error in fetching data');
    }
  }

  async findOne(id: string): Promise<Patient> {
    try {
      return this.patientModel.findById(id).exec();

    } catch (error) {
      throw new Error('Patient Not Found');

    }
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    try {
      const updatedPatient = await this.patientModel
        .findByIdAndUpdate(id, updatePatientDto, { new: true })
        .exec();

      if (!updatedPatient) {
        throw new NotFoundException(`Patient with ID ${id} not found.`);
      }
      return updatedPatient;
    } catch (error) {
      throw new InternalServerErrorException('Unable to update the patient.');
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this.patientModel.findByIdAndRemove(id).exec();
      console.log('result', result);
      if (!result) {
        return `Patient with ID ${id} not found.`
      }
    } catch (error) {
      return `Could not delete the patient.`
    }
  }
  }
