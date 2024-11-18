import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Homework } from './homework.model';
import { Lesson } from 'src/lessons/lesson.model';
import { HomeworkSubmission } from 'src/homework_submissions/homework_submission.model';
import { Course } from 'src/courses/course.model';
import { where } from 'sequelize';

@Injectable()
export class HomeworksService {
  constructor(@InjectModel(Homework) private homeworkModel: typeof Homework,
  @InjectModel(Lesson) private lessonModel: typeof Lesson,
  @InjectModel(Course) private courseModel: typeof Course
  ){}

  async create(createHomeworkDto: CreateHomeworkDto,user:any) {

    const course_id = (await this.lessonModel.findOne({where:{id:createHomeworkDto.lesson_id}})).course_id
    const teacher_id = (await this.courseModel.findOne({where:{id:course_id}})).teacher_id

    if(teacher_id !== user.id){
      throw new ForbiddenException('yu cant add to other courses')
    }

    const data = await this.homeworkModel.findOne({where: {lesson_id:createHomeworkDto.lesson_id}})
    if(data){
      return 'This lesson already has homework'
    }
    return await this.homeworkModel.create(createHomeworkDto);
  }

  async findAll() {
    return await this.homeworkModel.findAll({include: [{model: Lesson}]});
  }

  async findSubmissionOfHomework(id:number){
    const submissions = await this.homeworkModel.findOne({where :{id:id},include:{model:HomeworkSubmission}})
    return submissions
    
  }

  async findOne(id: number) {
    return await this.homeworkModel.findOne({where: {id:id},include: [{model: Lesson}]});
  }

  async update(id: number, updateHomeworkDto: UpdateHomeworkDto,user:any) {


    const lessonId = (await this.homeworkModel.findOne({where:{id:id}})).lesson_id
    const course_id = (await this.lessonModel.findOne({where:{id:lessonId}})).course_id
    const teacher_id = (await this.courseModel.findOne({where:{id:course_id}})).teacher_id

    if(teacher_id !== user.id){
      throw new ForbiddenException('yu cant edit other courses homeworks')
    }

    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('homework not found with this ID')
    }
    return await this.homeworkModel.update(updateHomeworkDto,{where: {id:id}});
  }

  async remove(id: number) {
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('homework not found with this ID')
    }
    return await this.homeworkModel.destroy({where :{id:id}});
  }
}
