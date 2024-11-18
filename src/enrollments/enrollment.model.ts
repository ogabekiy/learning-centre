import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/course.model";
import { User } from "src/users/user.model";

@Table({tableName: 'enrollments'})
export class Enrollment extends Model<Enrollment>{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Avtomatik ID ustuni
    })
    id: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    course_id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    student_id: number

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: DataType.NOW
    })
    enrollment_date: Date

    @BelongsTo(() => Course)
    course: Course;

    @BelongsTo(() => User)
    student: User;

}