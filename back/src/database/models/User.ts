import {Optional} from "sequelize";
import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import Contribution from "./Contribution";
import Gift from "./Gift";
import List from "./List";
import Role from "./Role";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    roleId: number;
    role: Role;
    contributions: List[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'roleId' | 'role' | 'contributions'> {}

@Table
export default class User extends Model<UserAttributes, UserCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.TEXT)
    email: string;

    @Column(DataType.TEXT)
    password: string;

    @AllowNull(false)
    @Default(2)
    @ForeignKey(() => Role)
    @Column(DataType.BIGINT)
    roleId: number;

    @BelongsTo(() => Role, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    role: Role;

    @HasMany(() => List, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    list: List;

    @HasMany(() => Gift, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    takenGifts: Gift[];

    @BelongsToMany(() => List, () => Contribution)
    contributions: List[];
}