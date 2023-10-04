import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { sign, verify } from 'jsonwebtoken';
  import { UserData } from 'src/patients/interfaces/user.interface';
  import { scrypt as _scrypt, randomBytes } from 'crypto';
  import { promisify } from 'util';
  import { User } from '../patients/model/user.schema';
import { UserService } from 'src/user/user.service';
    
  const scrypt = promisify(_scrypt);
  
  interface LoginCreds {
    email: string;
    password: string;
  }
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly userService: UserService
    ) {}
  
    async signup(user: UserData) {
      const { email, password } = user;
      const findExistingUser = await this.userService.findOneByEmail(email);
      if (findExistingUser)
        throw new BadRequestException('user already exist with this email');
      const salt = randomBytes(16).toString('hex');
      const hash = (await scrypt(password.toString(), salt, 16)) as Buffer;
      const stringHashed = hash.toString('hex');
      const hashedPass = `${salt}.${stringHashed}`;
      const userParams = {
        email,
        password: hashedPass,
      };
      const newUser = this.userService.create(userParams);
      return newUser;
    }
  
    async signin(loginCreds: LoginCreds) {
      const { email, password } = loginCreds;
      const user = await this.userService.findOneByEmail(email);
      if (!user) throw new NotFoundException('User not found');
  
      const storedPassword = user.password;
  
      const [salt, pass] = storedPassword.split('.');
      const stringHashed = (await scrypt(
        password.toString(),
        salt,
        16,
      )) as Buffer;
  
      const hashedPass = `${salt}.${stringHashed.toString('hex')}`;
  
      if (hashedPass !== storedPassword)
        throw new BadRequestException('User or Password does not match');
  
      const accessToken = sign(
        {
          email: email,
        },
        'patient',
        { expiresIn: '1h' },
      );
      const response = {
        token: accessToken,
      };
      return response;
    }
  
    verifyToken(token: string) {
      try {
        const decode = verify(token, 'patient');
        return decode;
      } catch (error) {
        throw new UnauthorizedException('Token validation failed');
      }
    }
  
    findUserByEmail(email: string) {
      return this.userService.findOneByEmail(email);
    }
  }