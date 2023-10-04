import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  readonly age?: number;

  @IsOptional()
  @IsString()
  readonly medicalHistory?: string;

  @IsOptional()
  @IsDate()
  readonly lastVisit?: Date;
}
