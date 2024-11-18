import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";
import { Homework } from "src/homeworks/homework.model";
import { Lesson_Attendance } from "src/lesson_attendances/lesson_attendance.model";

@Table({tableName: 'lessons'})
export class Lesson extends Model<Lesson>{
    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    course_id: number 
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    topic: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    video_url:string

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    date: Date

    @BelongsTo(() => Course)
    course: Course;    

    @HasMany(() => Lesson_Attendance)
    lesson_attendances: Lesson_Attendance[]

    @HasOne(() => Homework)
    homework: Homework
}