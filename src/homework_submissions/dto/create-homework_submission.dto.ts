import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateHomeworkSubmissionDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  homework_id: number;

  @IsNumber()
  @IsOptional()
  student_id: number;

  @IsOptional()
  homework_url: string;

  @IsOptional()
  @IsNumber()
  grade?: number;

  @IsOptional()
  @IsString()
  feedback?: string; 

  @IsOptional()
  @IsDate()
  homework_date?: Date; 
}
