import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from './patients/patients.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb+srv://admin:admin@cluster0.ijqrj5s.mongodb.net/',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  }),
    PatientsModule,
    AuthModule,
    UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
