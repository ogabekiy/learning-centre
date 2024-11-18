import { Module } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { HomeworksController } from './homeworks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Homework } from './homework.model';
import { UsersModule } from 'src/users/users.module';
import { Lesson } from 'src/lessons/lesson.model';
import { Course } from 'src/courses/course.model';

@Module({
  imports: [SequelizeModule.forFeature([Homework,Lesson,Course]),UsersModule],
  controllers: [HomeworksController],
  providers: [HomeworksService],
})
export class HomeworksModule {}
