import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/category.model";
import { Enrollment } from "src/enrollments/enrollment.model";
import { Lesson } from "src/lessons/lesson.model";
import { User } from "src/users/user.model";

@Table({tableName: 'courses'})
export class Course extends Model<Course>{
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    title: string
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string
    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    price: number

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    category_id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    teacher_id: number


    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    start_date: Date

    @Column({
        type: DataType.DATE
    })
    end_date: Date

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: 'true'
    })
    status : boolean
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    room: string

    @Column({
        type: DataType.TIME,
        allowNull: true
    })
    time: string

    @BelongsTo(() => Category)
    category: Category;

    @BelongsTo(() => User,{as: 'teacher'})
    user: User;

    @HasMany(() => Enrollment)
    enrollments: Enrollment[]

    @BelongsToMany(() => User,() => Enrollment)
    students: User[]

    @HasMany(() => Lesson, { as: 'lessons' })
    lessons: Lesson[];

//     @BelongsToMany(() => User, () => Enrollment)
// students: User[];


}