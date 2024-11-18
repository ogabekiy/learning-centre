// import { Model } from "sequelize";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";
import { Enrollment } from "src/enrollments/enrollment.model";
import { HomeworkSubmission } from "src/homework_submissions/homework_submission.model";
import { Homework } from "src/homeworks/homework.model";
import { Lesson_Attendance } from "src/lesson_attendances/lesson_attendance.model";

@Table({tableName: 'users'})
export class User extends Model<User>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email: string
    @Column({
        type: DataType.STRING,
        allowNull:false,
        validate: {
            len: [5,100]
        }
    })
    password: string
    @Column({
        type: DataType.STRING,
        allowNull:false,
        validate: {
            isIn: [['admin', 'teacher', 'user']]
        }
    })
    role: string
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: 'false'
    })
    is_verified: boolean

    // @HasMany(() => Course)
    // course: Course[]

    @HasMany(() => Lesson_Attendance)
    lesson_attendances: Lesson_Attendance[]

    @HasMany(() => HomeworkSubmission)
    homework_submissions: HomeworkSubmission[]

    @BelongsToMany(() => Course, () => Enrollment)
    courses: Course[];
    
}