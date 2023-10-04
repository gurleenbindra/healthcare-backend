import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientDto } from './dtos/patients.dto';
import { AuthGuard } from 'src/guards/AuthGuard';

@UseGuards(AuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post()
  async create(@Body() createPatientDto: PatientDto) {
    return await this.patientsService.create(createPatientDto);
  }

  @Get()
  async findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: PatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
