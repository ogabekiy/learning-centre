import { Module } from '@nestjs/common';
import { HomeworkSubmissionsService } from './homework_submissions.service';
import { HomeworkSubmissionsController } from './homework_submissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HomeworkSubmission } from './homework_submission.model';
import { UsersModule } from 'src/users/users.module';
import { Homework } from 'src/homeworks/homework.model';
import { Lesson } from 'src/lessons/lesson.model';
import { Enrollment } from 'src/enrollments/enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([HomeworkSubmission,Homework,Lesson,Enrollment]),UsersModule],
  controllers: [HomeworkSubmissionsController],
  providers: [HomeworkSubmissionsService],
})
export class HomeworkSubmissionsModule {}
