import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';
import { UsersModule } from 'src/users/users.module';
import { Course } from 'src/courses/course.model';
import { User } from 'src/users/user.model';

@Module({
  imports: [UsersModule,SequelizeModule.forFeature([Enrollment,Course,User])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
