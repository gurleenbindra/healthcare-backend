import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema()
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  medicalHistory: string;

  @Prop()
  lastVisit: Date;

  @Prop()
  email: string;

  @Prop()
  password:string
}

export const PatientSchema = SchemaFactory.createForClass(Patient);