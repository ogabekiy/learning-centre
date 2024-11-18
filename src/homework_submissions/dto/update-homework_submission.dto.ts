import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeworkSubmissionDto } from './create-homework_submission.dto';

export class UpdateHomeworkSubmissionDto extends PartialType(CreateHomeworkSubmissionDto) {}
