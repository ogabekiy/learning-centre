import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { HomeworksService } from './homeworks.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';

@Controller('homeworks')
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) {}

  @UseGuards(RoleGuard)
  @Roles('teacher')
  @Post()
  create(@Req()req,@Body() createHomeworkDto: CreateHomeworkDto) {
    const user = req.user.dataValues
    return this.homeworksService.create(createHomeworkDto,user);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.homeworksService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('admin','teacher')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworksService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('admin','teacher')
  @Get('submissions/:id')
  findSubmissions(@Param('id')id:string){
    return this.homeworksService.findSubmissionOfHomework(+id)
  }

  @UseGuards(RoleGuard)
  @Roles('teacher')
  @Patch(':id')
  update(@Req()req,@Param('id') id: string, @Body() updateHomeworkDto: UpdateHomeworkDto) {
    const user = req.user.dataValues
    return this.homeworksService.update(+id, updateHomeworkDto,user);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworksService.remove(+id);
  }
}
