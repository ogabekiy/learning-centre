import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateHomeworkDto {
    @IsNotEmpty()
    lesson_id: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value)) // Stringni Date obyektiga aylantiradi
    due_date: Date;
}
