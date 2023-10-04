import { Document } from 'mongoose';

export interface Patient extends Document {
  readonly name: string;
  readonly age: number;
  readonly medicalHistory: string;
  readonly lastVisit: Date;
  
}
