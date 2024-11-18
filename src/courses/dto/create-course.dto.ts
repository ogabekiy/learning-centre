import { IsBoolean, IsDate, IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 500)
    description: string;

    // @IsDecimal()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    category_id: number;

    @IsInt()
    @IsNotEmpty()
    teacher_id: number;

    @IsDateString()
    @IsNotEmpty()
    start_date: Date;

    @IsOptional()
    @IsDate()
    end_date?: Date;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsString()
    @IsNotEmpty()
    room: string;

    @IsOptional()
    @IsString()
    time?: string;
}
