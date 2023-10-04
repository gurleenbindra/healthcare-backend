import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/patients/dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: UserDto) {
      return await this.userService.create(createUserDto);
    }

    // @Get(':email')
    // async findOneByEmail(@Param('email') email:string){
    //     return await this.findOneByEmail()

    // }
  
}
