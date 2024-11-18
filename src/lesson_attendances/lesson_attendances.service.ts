import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonAttendanceDto } from './dto/create-lesson_attendance.dto';
import { UpdateLessonAttendanceDto } from './dto/update-lesson_attendance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson_Attendance } from './lesson_attendance.model';
import { Lesson } from 'src/lessons/lesson.model';
import { User } from 'src/users/user.model';
import { Course } from 'src/courses/course.model';

@Injectable()
export class LessonAttendancesService {
  constructor(@InjectModel(Lesson_Attendance) private lessonAttendance: typeof Lesson_Attendance,
    @InjectModel(Lesson) private lessonModel:typeof Lesson,
    @InjectModel(Course) private courseModel: typeof Course
  ){}


  async create(createLessonAttendanceDto: CreateLessonAttendanceDto,user:any) {

    const lessonId = createLessonAttendanceDto.lesson_id
    const course_id = (await this.lessonModel.findOne({where:{id:lessonId}})).course_id

    const teacher_id = (await this.courseModel.findOne({where:{id:course_id}})).teacher_id

    if(teacher_id !== user.id){
      throw new ForbiddenException(" yu cant do attendacnce to other course ")
    }
    const data = this.lessonAttendance.findOne({where:{student_id:createLessonAttendanceDto.student_id}})
    if(data){
      return 'Yu already signed this student'
    }
    return await this.lessonAttendance.create(createLessonAttendanceDto);
  }

  async findAll() {
    return await this.lessonAttendance.findAll({include: [{model: Lesson},{model: User}]});
  }

  async findOne(id: number) {
    return await this.lessonAttendance.findOne({where:{id:id}});
  }
  async findOneByLesson(id:number){
    return await this.lessonAttendance.findOne({where: {lesson_id:id}})
  }

  async update(id: number, updateLessonAttendanceDto: UpdateLessonAttendanceDto,user:any) {
    if(user.role === 'admin'){
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('lesson not found')
    }
    return await this.lessonAttendance.update(updateLessonAttendanceDto,{where:{id:id}});}

    const lessonId = id
    const course_id = (await this.lessonModel.findOne({where:{id:lessonId}})).course_id

    const teacher_id = (await this.courseModel.findOne({where:{id:course_id}})).teacher_id

    if(teacher_id !== user.id){
      throw new ForbiddenException(" yu cant edit attendacnce to other course ")
    }
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('lesson not found')
    }
    return await this.lessonAttendance.update(updateLessonAttendanceDto,{where:{id:id}})

  }

  async remove(id: number) {
    const data = await this.findOne(id)
    if(!data){
      throw new NotFoundException('lesson not found')
    }
    return await this.lessonAttendance.destroy({where:{id:id}});
  }
}
