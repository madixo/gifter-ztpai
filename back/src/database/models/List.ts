import {Optional} from "sequelize";
import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import User from "../models/User";
import Contributions from "./Contributions";

interface ListAttributes {
    id: number;
    name: string;
    access_code: number;
    ownerId: number;
    owner: User;
    contributions: Contributions;
}

interface ListCreationAttributes extends Optional<ListAttributes, 'id' | 'owner' | 'contributions'> {}

@Table
export default class List extends Model<ListAttributes, ListCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name: string;

    @AllowNull(false)
    @Column
    access_code: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    ownerId: number;

    @BelongsTo(() => User)
    owner: User;

    @BelongsToMany(() => List, () => Contributions)
    contributions: Contributions;
}