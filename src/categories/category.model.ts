// import { Model } from "sequelize";
import { Table ,Model, Column, DataType, HasMany} from "sequelize-typescript";
import { Course } from "src/courses/course.model";

@Table({tableName: 'categories'})
export class Category extends Model<Category>{
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    description: string

    @HasMany(() => Course)
    courses: Course[]
}