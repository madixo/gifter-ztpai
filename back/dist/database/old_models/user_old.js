"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const role_old_1 = __importDefault(require("./role_old"));
const User = db_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.TEXT
    },
    roleId: {
        type: sequelize_1.DataTypes.BIGINT
    }
});
User.belongsTo(role_old_1.default);
exports.default = User;
