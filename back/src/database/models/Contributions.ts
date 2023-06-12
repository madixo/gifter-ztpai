import {AllowNull, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import List from "./List";
import User from "./User";

interface ContributionAttributes {
    userId: number;
    listId: number;
}

@Table
export default class Contributions extends Model<ContributionAttributes> {
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number;

    @AllowNull(false)
    @ForeignKey(() => List)
    @Column
    listId: number;
}