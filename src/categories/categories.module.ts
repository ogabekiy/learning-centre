import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
import { Course } from 'src/courses/course.model';

@Module({
  imports: [SequelizeModule.forFeature([Category,Course])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
