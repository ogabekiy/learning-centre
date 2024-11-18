import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './lesson.model';
import { Course } from 'src/courses/course.model';
import { UsersModule } from 'src/users/users.module';
import { Enrollment } from 'src/enrollments/enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson,Course,Enrollment]),UsersModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
