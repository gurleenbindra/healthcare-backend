import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'src/patients/dtos/user.dto';
import { User } from 'src/patients/model/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>,
    ) { }
  
    async create(createUserDto: UserDto): Promise<User> {
      try {
        const user = new this.userModel(createUserDto);
        return await user.save();
      } catch (error) {
        throw new Error('Unable to create a user.');
      }
    }

    async findOneByEmail(email: string): Promise<User> {
        try {
          return this.userModel.findOne({email}).exec();
        } catch (error) {
          throw new Error('User Not Found');
    
        }
      }

    
}
