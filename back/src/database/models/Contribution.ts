import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import List from "./List";
import User from "./User";

interface ContributionAttributes {
    userId: number;
    listId: number;
}

@Table
export default class Contribution extends Model<ContributionAttributes> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        onDelete: 'CASCADE'
    })
    userId: number;

    @ForeignKey(() => List)
    @Column({
        type: DataType.BIGINT,
        onDelete: 'CASCADE'
    })
    listId: number;
}