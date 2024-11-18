import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';
import { Course } from 'src/courses/course.model';
import { User } from 'src/users/user.model';

@Injectable()
export class EnrollmentsService {
  constructor(@InjectModel(Enrollment) private EnrollmentModel: typeof Enrollment){}
  async create(createEnrollmentDto: CreateEnrollmentDto,user:any) {


    if(user.role === 'admin'||'teacher'){
      throw new ForbiddenException('teacher and admin cant study heere') 
    }

    const enrollment = await this.EnrollmentModel.findOne({where: {course_id:createEnrollmentDto.course_id,student_id: user.id}})
    if(enrollment){
      throw new ForbiddenException('yu already exist on this course')
    }

    createEnrollmentDto.student_id= user.id
    return await this.EnrollmentModel.create(createEnrollmentDto);
  }

  async findAll() {
    return await this.EnrollmentModel.findAll({include: [{model: Course,attributes: ['title']},{model: User,attributes:['name']}]});
  }
  // async findAll() {
  //   return await this.EnrollmentModel.findAll();
  // }

  async findOne(id: number) {
    return await this.EnrollmentModel.findOne({where:{id:id},include: [{model: Course,attributes: ['title']},{model: User,attributes:['name']}]});
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return await this.EnrollmentModel.update(updateEnrollmentDto,{where:{id:id}});
  }

  async remove(id: number) {
    return await this.EnrollmentModel.destroy({where: {id:id}});
  }
}
