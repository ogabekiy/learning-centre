import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authsService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() createLoginDto: LoginUserDto){
    return this.authsService.login(createLoginDto)
  }

  


}
