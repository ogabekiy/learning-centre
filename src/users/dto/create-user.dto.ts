import { IsEmail, IsIn, IsNotEmpty, IsString, Length } from "class-validator";
// import { IsIn } from "sequelize-typescript";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(5,100)
    password: string

    @IsString()
    @IsNotEmpty()
    @IsIn(['user','admin','teacher'])
    role: string

}

