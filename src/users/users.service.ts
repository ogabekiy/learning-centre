import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs'
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { MailService } from 'src/common/service/mail.service';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from 'src/common/config/config.service';
import { Model } from 'sequelize';
import { Course } from 'src/courses/course.model';
import { Enrollment } from 'src/enrollments/enrollment.model';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private UserModel: typeof User,
  private mailService:MailService,
  private configService: ConfigService
){}
  async create(createUserDto: CreateUserDto) {
    const data = await this.findOneByEmail(createUserDto.email)
    if(data){
       throw new ConflictException('User with this email already exists')
    }
    if(createUserDto.role === 'admin'){
      throw new ForbiddenException('yu cant be admin without help of admin')
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password,10)

    return await this.UserModel.create(createUserDto);
  }

  async createAdmin(createUserDto:CreateUserDto){
    const data = await this.findOneByEmail(createUserDto.email)
    if(data){
       throw new ConflictException('User with this email already exists')
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password,10)
    return await this.UserModel.create(createUserDto);


  }

  async findOneByEmail(email:string){
    return await this.UserModel.findOne({where:{email:email}})
  }
  async findAll() {
    return await this.UserModel.findAll();
  }

  async CoursesOfOneTeacher(id:number){
    return await this.UserModel.findOne({where : {id:id},include: [{model: Course,attributes: ['id','title']}] })
  }

  async findOnlyAdmins(){return await this.UserModel.findAll({where: {role: 'admin'}})}

  async findOne(id: number) {
    return await this.UserModel.findOne({where:{id:id}});
  }

  async findCoursesOfOneUser(id: number) {
    const user = await this.UserModel.findOne({
      where: { id: id },
      include: [{
        model: Course,
        attributes: ['id', 'title'],
        through: { attributes: [] } 
      }]
    });
    return user;
  }
  

  async verify (user:any){
    console.log(user)

    const token = await jwt.sign(
      {email: user.email},this.configService.get('JWT_EMAIL_SECRET'),{expiresIn: '1h'}
    )
    this.mailService.sendMail(user.email,token)
    return 'alright look a your mails twizzy'
  }

  async confirmEmail(token:any){
    try{
      const decoded = jwt.verify(token,this.configService.get('JWT_EMAIL_SECRET')) as {email: string}
      const email = decoded.email
      const user = await this.findOneByEmail(email)
      if(!user){
        throw new NotFoundException('user not found')
      }
      user.is_verified = true
      await user.save()

      return 'everythin is alrigth yu verified'
    }
    catch(error){
      throw new BadRequestException('invalid token')
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
      const data = await this.findOne(id)
      if(!data){
        throw new NotFoundException('User with this ID doesnt exist')
      }
    
    const result = await this.UserModel.update(updateUserDto,{where: {id:id}})
    return result;
  }

  

  async remove(id: number) {
    const data = await this.findOne(id)
      if(!data){
        throw new NotFoundException('User with this ID doesnt exist')
      }
    return this.UserModel.destroy({where: {id:id}});
  }
}
