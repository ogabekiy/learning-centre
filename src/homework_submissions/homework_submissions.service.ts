import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHomeworkSubmissionDto } from './dto/create-homework_submission.dto';
import { UpdateHomeworkSubmissionDto } from './dto/update-homework_submission.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HomeworkSubmission } from './homework_submission.model';
import { Homework } from 'src/homeworks/homework.model';
import { User } from 'src/users/user.model';
import { Lesson } from 'src/lessons/lesson.model';
import { Enrollment } from 'src/enrollments/enrollment.model';

@Injectable()
export class HomeworkSubmissionsService {
  constructor(@InjectModel(HomeworkSubmission) private homeworkSubmissionModel: typeof HomeworkSubmission,
@InjectModel(Homework) private homeworkModel:typeof Homework,
@InjectModel(Lesson) private lessonModel: typeof Lesson,
@InjectModel(Enrollment)private enrollmentModel: typeof Enrollment){}

  async createByStudent(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto,user:any) {

    const lesson_id = (await this.homeworkModel.findOne({where:{id:createHomeworkSubmissionDto.homework_id}})).lesson_id
    const course_id = (await this.lessonModel.findOne({where:{id:lesson_id}})).course_id
    const enrollment = await this.enrollmentModel.findOne({where:{student_id: user.id,course_id: course_id}})

    if(!enrollment){
      throw new ForbiddenException(" yu cant send homework submission to others homeworks")
    }

    const data = await this.homeworkSubmissionModel.findOne({where :{student_id: createHomeworkSubmissionDto.student_id,homework_id:createHomeworkSubmissionDto.homework_id}})
    if(data){
      return 'Homework was already done '
    }
    return await this.homeworkSubmissionModel.create(createHomeworkSubmissionDto);
  }

  async checkByTeacher(id:number,checkHomework:any){
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('homework submission not found')
    }
    return await this.homeworkSubmissionModel.update(checkHomework,{where: {id:id}})
  }

  async findAll() {
    return await this.homeworkSubmissionModel.findAll({include:[{model: Homework},{model: User}]});
  }

  async findOne(id: number) {
    return await this.homeworkSubmissionModel.findOne({where:{id:id},include: [{model: Homework},{model: User}]});
  }

  update(id: number, updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto) {
    return `This action updates a #${id} homeworkSubmission`;
  }

  async remove(id: number) {
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('homework submission not found')
    }
    return await this.homeworkSubmissionModel.destroy({where:{id:id}});
  }
}
