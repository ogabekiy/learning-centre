import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/common/guards/authGuard';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @UseGuards(AuthGuard)
  @Get('admins')
  findAdmins(@Request() req){
    const user=req.user.dataValues
    console.log(user)
    return this.usersService.findOnlyAdmins()
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Post('createAdmin')
  createAdmin(@Body()createUserDto:CreateUserDto){
    return this.usersService.createAdmin(createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@Request() req){
    const user = req.user.dataValues
    return this.usersService.verify(user)
  }

  @Get(':token')
  verifyMail(@Param('token') token: string) {
    return this.usersService.confirmEmail(token);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('teacher/:id')
  findCoursesOfTeacher(@Param('id')id:string){
    return this.usersService.CoursesOfOneTeacher(+id)
  }

  @Get('coursesof/:id')
  findCoursesOf(@Param('id')id:string){
    return this.usersService.findCoursesOfOneUser(+id)
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
