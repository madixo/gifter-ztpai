import {Optional} from "sequelize";
import {AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import List from "./List";
import User from "./User";

interface GiftAttributes {
    id: number;
    listId: number;
    list: List;
    name: string;
    image: string;
    price: number;
    description: string;
    takenById: number;
    takenBy: User;
}

interface GiftCreationAttributes extends Optional<GiftAttributes, 'id' | 'list' | 'description' | 'price' | 'takenBy' | 'takenById'> {}

@Table
export default class Gift extends Model<GiftAttributes, GiftCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id: number;

    @AllowNull(false)
    @ForeignKey(() => List)
    @Column({
        type: DataType.BIGINT,
        onDelete: 'CASCADE'
    })
    listId: number;

    @BelongsTo(() => List)
    list: List;

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
    @Column({
        type: DataType.BIGINT,
        onDelete: 'CASCADE'
    })
    takenById: number;

    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    takenBy: User;
}