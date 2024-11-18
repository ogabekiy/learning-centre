import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateLessonAttendanceDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    lesson_id:number

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value), { toClassOnly: true })
    student_id:number

    @IsNotEmpty()
    @IsBoolean()
    attendance_status: boolean
}
