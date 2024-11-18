import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { HomeworkSubmissionsService } from './homework_submissions.service';
import { CreateHomeworkSubmissionDto } from './dto/create-homework_submission.dto';
import { UpdateHomeworkSubmissionDto } from './dto/update-homework_submission.dto';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/common/guards/authGuard';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';


const filename = (req, file, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
};

const fileFilter = (req, file, callback) => {
  callback(null, true); 
};


@Controller('homework-submissions')
export class HomeworkSubmissionsController {
  constructor(private readonly homeworkSubmissionsService: HomeworkSubmissionsService) {}


  @UseGuards(RoleGuard)
  @Roles('user')
  @Post()
  @UseInterceptors(
    FileInterceptor('homework_url', {
      storage: diskStorage({
        destination: './homework_uploads',
        filename: filename,
      }),
      fileFilter: fileFilter,
    }),
  )
  create(@Request() req,@UploadedFile() homework_url: Express.Multer.File,@Body() createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
    console.log('homework-url',homework_url.filename)
    // console.log(req.user.dataValues.id)

    createHomeworkSubmissionDto.homework_url = homework_url.filename
    createHomeworkSubmissionDto.student_id = req.user.dataValues.id
    // return 'alright'
    return this.homeworkSubmissionsService.createByStudent(createHomeworkSubmissionDto,req.user.dataValues);
  }

  @Patch('check/:id')
  check(@Param('id') id:string,@Body() checkHomework:UpdateHomeworkSubmissionDto){
    return this.homeworkSubmissionsService.checkByTeacher(+id,checkHomework)
  }

  @Get()
  findAll() {
    return this.homeworkSubmissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkSubmissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto) {
    return this.homeworkSubmissionsService.update(+id, updateHomeworkSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworkSubmissionsService.remove(+id);
  }
}
