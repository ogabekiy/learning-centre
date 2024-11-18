import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Homework } from "src/homeworks/homework.model";
import { User } from "src/users/user.model";

@Table({tableName: 'homework_submissions'})
export class HomeworkSubmission extends Model<HomeworkSubmission>{
    @ForeignKey(() => Homework)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    homework_id: number

    @BelongsTo(() => Homework)
    homework: Homework

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    student_id :number

    @BelongsTo(() => User)
    student: User

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    homework_url: string

    @Column({
        type: DataType.INTEGER
    })
    grade: number

    @Column({
        type: DataType.TEXT
    })
    feedback: string

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    homework_date: Date
}