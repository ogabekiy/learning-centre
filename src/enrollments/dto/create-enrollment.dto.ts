import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateEnrollmentDto {
    @IsNumber()
    @IsNotEmpty()
    course_id: number

    @IsOptional()
    student_id:number

    @IsOptional()
    enrollment_date: Date
}
