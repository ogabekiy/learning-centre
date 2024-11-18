import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { SharedModule } from './common/shared.module';
import { CategoriesModule } from './categories/categories.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonAttendancesModule } from './lesson_attendances/lesson_attendances.module';
import { HomeworksModule } from './homeworks/homeworks.module';

import { HomeworkSubmissionsModule } from './homework_submissions/homework_submissions.module';
@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    database: 'lc',
    username: 'postgres',
    password: '123456',
    host: '127.0.0.1',
    port: 5432,
    autoLoadModels: true,
    synchronize: true
  }), UsersModule, AuthsModule,SharedModule, CategoriesModule, CoursesModule, EnrollmentsModule, LessonsModule, LessonAttendancesModule, HomeworksModule, HomeworkSubmissionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
