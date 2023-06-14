import {Optional} from "sequelize";
import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import User from "../models/User";
import Contribution from "./Contribution";
import Gift from "./Gift";

interface ListAttributes {
    id: number;
    name: string;
    accessCode: number;
    ownerId: number;
    owner: User;
    contributors: Contribution[];
}

interface ListCreationAttributes extends Optional<ListAttributes, 'id' | 'owner' | 'contributors'> {}

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
    accessCode: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        onDelete: 'CASCADE'
    })
    ownerId: number;

    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    owner: User;

    @HasMany(() => Gift, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    gifts: Gift[];

    @BelongsToMany(() => User, () => Contribution)
    contributors: User[];
}