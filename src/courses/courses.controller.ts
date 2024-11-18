import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';
import { AuthGuard } from 'src/common/guards/authGuard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }


  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }


  @UseGuards(RoleGuard)
  @Roles('teacher')
  @Get('StudentsOfCourseId/:id')
  findStudentsOFCourse(@Param('id')id:string){
    return this.coursesService.findStudentsOfCourse(+id)
  }

  @Get('ofTeacher/:id')
  findCoursesOfTeacher(@Param('id')id:string){
    return this.coursesService.findCoursesOfTeacher(+id)
  }
  
  @UseGuards(AuthGuard)
  @Get('LessonsOfCourse/:id')
  findLessonsOfCourse(@Req()req,@Param('id')id:string){
    const user = req.user.dataValues
    // console.log(user)
    return this.coursesService.findLessonsOfCourse(+id,user)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
