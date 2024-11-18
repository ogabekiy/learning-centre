import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';
import { AuthGuard } from 'src/common/guards/authGuard';

const filename = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
};

const fileFilter = (req, file, callback) => {
  const isValidType = file.mimetype.startsWith('video/');
  if (isValidType) {
    callback(null, true); 
  } else {
    callback(
      new BadRequestException('Invalid format! Only video files are allowed.'),
      false,
    );
  }
};

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(RoleGuard)
  @Roles('teacher')
  @Post()
  @UseInterceptors(
    FileInterceptor('video_url', {
      storage: diskStorage({
        destination: './lesson_uploads',
        filename: filename,
      }),
      fileFilter: fileFilter,
    }),
  )
  create(@Req() req,
    @UploadedFile() video_url: Express.Multer.File,
    @Body() createLessonDto: CreateLessonDto,
  ) {
    
    const videoFileName = video_url ? video_url.filename : null;
    const teacher = req.user.dataValues.id
    createLessonDto.video_url = videoFileName;
    return this.lessonsService.create(createLessonDto,teacher);
  }
  

  
  @UseGuards(RoleGuard)
  @Roles('amdin')
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('admin','teacher')
  @Get('attendances/:id')
  findAttendancesOfLesson(@Req()req,@Param('id')id:string){
    const user = req.user.dataValues
    return this.lessonsService.findAttendancesOfLesson(+id,user)
  }


  @UseGuards(AuthGuard)
  @Get('homeworks/:id')
  findHomeworkOfLesson(@Req()req,@Param('id')id:string){
    const user = req.user.dataValues
    return this.lessonsService.findHomeworksOfLesson(+id,user)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('teacher','admin')
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('video_url', {
      storage: diskStorage({
        destination: './lesson_uploads',
        filename: filename,
      }),
      fileFilter: fileFilter,
    }),
  )
  update(@Req() req,
  @UploadedFile() video_url: Express.Multer.File,@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    const videoFileName = video_url ? video_url.filename : null;
    const teacher = req.user.dataValues.id
    updateLessonDto.video_url = videoFileName;
    return this.lessonsService.update(+id, updateLessonDto,teacher);
  }


  @UseGuards(RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
