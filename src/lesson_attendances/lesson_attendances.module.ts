import { Module } from '@nestjs/common';
import { LessonAttendancesService } from './lesson_attendances.service';
import { LessonAttendancesController } from './lesson_attendances.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson_Attendance } from './lesson_attendance.model';
import { UsersModule } from 'src/users/users.module';
import { Lesson } from 'src/lessons/lesson.model';
import { Course } from 'src/courses/course.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson_Attendance,Lesson,Course]),UsersModule],
  controllers: [LessonAttendancesController],
  providers: [LessonAttendancesService],
})
export class LessonAttendancesModule {}
