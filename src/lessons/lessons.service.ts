import { BadRequestException, Body, ForbiddenException, Injectable, NotFoundException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './lesson.model';
import { Course } from 'src/courses/course.model';
import { Lesson_Attendance } from 'src/lesson_attendances/lesson_attendance.model';
import { Homework } from 'src/homeworks/homework.model';
import { where } from 'sequelize';
import { Enrollment } from 'src/enrollments/enrollment.model';



@Injectable()
export class LessonsService {
  constructor(@InjectModel(Lesson) private lessonModel:typeof Lesson,@InjectModel(Course) private courseModel: typeof Course,@InjectModel(Enrollment) private enrollmentModel:typeof Enrollment){}

  async create(createLessonDto:CreateLessonDto,teacher:number){
    // console.log(createLessonDto)
    // console.log('tchr',teacher)
    const course_id = createLessonDto.course_id
    const teacherOfCourse = (await this.courseModel.findOne({where:{id:course_id}})).teacher_id
    if(teacher !== teacherOfCourse){
      return 'yu cant add lesson to other courses'
    }
    return this.lessonModel.create(createLessonDto)
  }

  async findAll() {
     return await this.lessonModel.findAll({include: [{model: Course}]});
  }

  async findAttendancesOfLesson(id:number,user:any){
    if(user.role=='admin'){
    const attendances = await this.lessonModel.findOne({where: {id:id},include: {model: Lesson_Attendance}})
    return attendances}

    const teacherOfCourse = (await this.courseModel.findOne({where:{id:id}})).teacher_id
    if(teacherOfCourse!== user.id){
      throw new ForbiddenException('yu cant see other courses lessons attendances' )
    }
    return this.lessonModel.findAll({where: {id:id},include: {model: Lesson_Attendance}})
  }

  async findHomeworksOfLesson(id:number,user:any){
    if(user.role==='admin'){
    const homeworks = await this.lessonModel.findOne({where: {id:id},include:{model: Homework}})
    return homeworks}
    else if(user.role==='teacher'){
      const teacherOfCourse = (await this.courseModel.findOne({where:{id:id}})).teacher_id
      if(teacherOfCourse!== user.id){
      throw new ForbiddenException('yu cant see other courses lessons homeworks' )
    }
    const homeworks = await this.lessonModel.findOne({where:{id:id},include:{model: Homework}})
    return homeworks
    }
    const course_id = (await this.lessonModel.findOne({where :{id:id}})).course_id
    const enrollment = await this.enrollmentModel.findOne({where:{course_id: course_id,student_id: user.id}})
    if(!enrollment){
      throw new ForbiddenException(" siz bu vazifani olomyasiz cz yu dont study in this course")
    }
    const homeworks = await this.lessonModel.findOne({where:{id:id},include:{model: Homework}})

    return homeworks
    //
  }

  async findOne(id: number) {
    return await this.lessonModel.findOne({where :{id:id},include: [{model: Course}]});
  }

  async update(id: number, updateLessonDto: UpdateLessonDto,teacher:number) {
    const course_id = updateLessonDto.course_id
    const teacherOfCourse = (await this.courseModel.findOne({where:{id:course_id}})).teacher_id
    if(teacher !== teacherOfCourse){
      return 'yu cant edit lesson to other courses'
    }
    return await this.lessonModel.update(updateLessonDto,{where:{id:id}});
  }

  async remove(id: number) {
    const data  = await this.findOne(id)
    if(!data){
      throw new NotFoundException('not found')
    }
    return await this.lessonModel.destroy({where: {id:id}});
  }
}
