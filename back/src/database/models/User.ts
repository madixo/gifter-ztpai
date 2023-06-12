import {Optional} from "sequelize";
import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import Contributions from "./Contributions";
import Role from "./Role";

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    roleId: number;
    role: Role;
    contributions: Contributions;
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

    @BelongsTo(() => Role)
    role: Role;

    @BelongsToMany(() => User, () => Contributions)
    contributions: Contributions;
}