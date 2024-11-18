import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonAttendanceDto } from './create-lesson_attendance.dto';

export class UpdateLessonAttendanceDto extends PartialType(CreateLessonAttendanceDto) {}
