import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LessonAttendancesService } from './lesson_attendances.service';
import { CreateLessonAttendanceDto } from './dto/create-lesson_attendance.dto';
import { UpdateLessonAttendanceDto } from './dto/update-lesson_attendance.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';

@Controller('lesson-attendances')
export class LessonAttendancesController {
  constructor(private readonly lessonAttendancesService: LessonAttendancesService) {}

  @UseGuards(RoleGuard)
  @Roles('teacher')
  @Post()
  create(@Req() req,@Body() createLessonAttendanceDto: CreateLessonAttendanceDto) {

    const user  = req.user.dataValues
    return this.lessonAttendancesService.create(createLessonAttendanceDto,user);
  }


  @UseGuards(RoleGuard)
  @Roles('admin','teacher')
  @Get()
  findAll() {
    return this.lessonAttendancesService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('admin','teacher')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonAttendancesService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('admin','teacher')
  @Get('lessonid/:id')
  findOneByLesson(@Param('id') id:string){
    return this.lessonAttendancesService.findOneByLesson(+id)
  }

  @UseGuards(RoleGuard)
  @Roles('teacher','admin')
  @Patch(':id')
  update(@Req()req,@Param('id') id: string, @Body() updateLessonAttendanceDto: UpdateLessonAttendanceDto) {
    const user = req.user.dataValues

    return this.lessonAttendancesService.update(+id, updateLessonAttendanceDto,user);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonAttendancesService.remove(+id);
  }
}
