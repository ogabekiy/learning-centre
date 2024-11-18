import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { Course } from 'src/courses/course.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category){}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryModel.findAll();
  }

  async findOne(id: number) {
    return await this.categoryModel.findOne({where: {id:id}});
  }
  async findCoursesofCategory(id:number){
    return await this.categoryModel.findAll({include: {model: Course}})
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException("category with this id not found")
    }
    return await this.categoryModel.update(updateCategoryDto,{where:{id:id}});
  }

  async remove(id: number) {
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException("category with this id not found")
    }
    return this.categoryModel.destroy({where: {id:id}});
  }
}
