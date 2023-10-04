import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/patients/dtos/user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signUp(@Body() body:UserDto){
        return this.authService.signup(body)
    }

    @Post('/login')
    async login(@Body() body:UserDto, @Res({passthrough: true}) res: Response){
        const resp = await this.authService.signin(body)
        res.status(200).json(resp)
    }

}
