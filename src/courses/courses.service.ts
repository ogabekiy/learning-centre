import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './course.model';
import { Category } from 'src/categories/category.model';
import { User } from 'src/users/user.model';
import { Enrollment } from 'src/enrollments/enrollment.model';
import { Lesson } from 'src/lessons/lesson.model';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course) private courseModel: typeof Course,@InjectModel(Enrollment) private enrollmentModel:typeof Enrollment){}
  async create(createCourseDto: CreateCourseDto) {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll() {
    return await this.courseModel.findAll({
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: User,
          as: 'teacher', 
          attributes: ['name'],
        },
        {
          model: User,
          as: 'students', 
          attributes: ['name'],
        },
      ],
    });
  }

  async findOne(id: number) {
    return await this.courseModel.findOne({include: [{model: Category,attributes: ['name']},{model: User,attributes: ['name']}]});
  }

  async findCoursesOfTeacher(id:number){
    return await this.courseModel.findAll({where: {id:id}})
  }

  async findStudentsOfCourse(id: number) {
    const course = await this.courseModel.findOne({
        where: { id },
        include: [
            {
                model: User,
                through: { attributes: [] },
                as: 'students'
            },
        ],
    });
    
    return course;
}

async findLessonsOfCourse(id:number,user:any){

  if(user.role === 'admin'){
    const lessons = await this.courseModel.findOne({
      where: {id:id},include: {model: Lesson,as: 'lessons'}
    })
    return lessons
  }

  if(user.role === 'teacher'){
    const lessons = await this.courseModel.findOne({where:{id:id,teacher_id: user.id},include:{model:Lesson,as :'lessons'}})
    return lessons
  }

  const enrollment = await this.enrollmentModel.findOne({where: {course_id:id,student_id: user.id}})
  if(!enrollment){
    throw new ForbiddenException('Siz bu kursga yozilmagansiz');
  }
  const lessons = await this.courseModel.findOne({
    where: { id },
    include: { model: Lesson, as: 'lessons' },
  });

  return lessons
  
}


  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('this course not found')
    }
    return await this.courseModel.update(updateCourseDto,{where: {id:id}});
  }

  async remove(id: number) {
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('this course not found')
    }
    return await this.courseModel.destroy({where:{id:id}});
  }
}
