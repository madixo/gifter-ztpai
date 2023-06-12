import {Optional} from 'sequelize';
import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

interface RoleAttributes {
    id: number;
    name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

@Table
export default class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name: string;
}