import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './course.model';
import { UsersModule } from 'src/users/users.module';
import { Enrollment } from 'src/enrollments/enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([Course,Enrollment]),UsersModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
