import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { HomeworkSubmission } from "src/homework_submissions/homework_submission.model";
import { Lesson } from "src/lessons/lesson.model";

@Table({tableName: 'homeworks'})
export class Homework extends Model<Homework>{
    @ForeignKey(() => Lesson)
    @Column({
        type:DataType.INTEGER,
        allowNull: false 
    })
    lesson_id:number
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    due_date: Date

    @BelongsTo(() => Lesson)
    lesson: Lesson

    @HasOne(() => HomeworkSubmission)
    homework_submission:HomeworkSubmission
}