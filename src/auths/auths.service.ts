import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/users/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs'
import { ConfigService } from 'src/common/config/config.service';
import * as jwt from 'jsonwebtoken'


@Injectable()
export class AuthsService {
  constructor(@InjectModel(User) private userModel: typeof User,
  @Inject() private configService:ConfigService    
){}
  async create(createUserDto: CreateUserDto) {
    const data = await this.findOneByEmail(createUserDto.email)
    if(data){
       throw new ConflictException('User with this email already exists')
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password,10)
    return await this.userModel.create(createUserDto);
  }
  async login(loginUserdto:LoginUserDto){
    console.log(loginUserdto)
    const data = await this.findOneByEmail(loginUserdto.email)
    if(!data){
      throw new BadRequestException("wrong email or password")
    }

    const checkPassword = await bcrypt.compare(loginUserdto.password,data.password)
    if(!checkPassword){
      throw new UnauthorizedException("valid email or password")
    }

    // console.log('jwt',this.configService.get('JWT_ACCESS_TOKEN'))
    const token = await jwt.sign({email: loginUserdto.email},this.configService.get('JWT_ACCESS_TOKEN'),{expiresIn: '1h'})

      return await {token}
    }
  async findOneByEmail(email:string){
      return await this.userModel.findOne({where:{email:email}})
    }

    async findOneById(id:number){
      return await this.userModel.findOne({where: {id:id}})
    }
    
  
    
}
