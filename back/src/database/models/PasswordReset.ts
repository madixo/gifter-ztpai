import {randomUUID} from "crypto";
import {Optional} from "sequelize";
import {BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import User from "./User";

interface PasswordResetAttributes {
    id: string;
    userId: number;
    user: User;
}

interface PasswordResetCreationAttributes extends Optional<PasswordResetAttributes, 'user' | 'id'> {}

@Table
export default class PasswordReset extends Model<PasswordResetAttributes, PasswordResetCreationAttributes> {

    @Default(() => randomUUID())
    @Column(DataType.UUID)
    id: string;

    @PrimaryKey
    @ForeignKey(() => User)
    @Unique
    @Column({
        type: DataType.BIGINT,
        onDelete: 'CASCADE'
    })
    userId: number;

    @BelongsTo(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User;

}