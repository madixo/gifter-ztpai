import {Optional} from 'sequelize';
import {AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import User from './User';

interface RoleAttributes {
    id: number;
    name: string;
    user: User;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'user'> {}

@Table
export default class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name: string;

    @HasMany(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    users: User[];
}