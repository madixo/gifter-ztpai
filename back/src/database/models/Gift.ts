import {Optional} from "sequelize";
import {AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import List from "./List";
import User from "./User";

interface GiftAttributes {
    id: number;
    list_id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    taken_by_id: number;
    taken_by: User;
}

interface GiftCreationAttributes extends Optional<GiftAttributes, 'id' | 'description' | 'price' | 'taken_by' | 'taken_by_id'> {}

@Table
export default class Gift extends Model<GiftAttributes, GiftCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id: number;

    @AllowNull(false)
    @ForeignKey(() => List)
    @Column(DataType.BIGINT)
    list_id: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    image: string;

    @Column('numeric(10, 2)')
    price: number;

    @Column(DataType.TEXT)
    description: string;

    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    taken_by_id: number;

    @BelongsTo(() => User)
    taken_by: User;

    @BelongsTo(() => List)
    list: List;
}