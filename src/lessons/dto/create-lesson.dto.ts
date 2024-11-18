import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    course_id: number

    @IsString()
    @IsNotEmpty()
    topic: string

    @IsString()
    @IsOptional()
    video_url:string

    @IsOptional()
    date:Date
}
