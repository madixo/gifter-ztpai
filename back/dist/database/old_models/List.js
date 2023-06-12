"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const user_old_1 = __importDefault(require("./user_old"));
const List = db_1.default.define('list', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    access_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ownerId: {
        type: sequelize_1.DataTypes.BIGINT,
        references: user_old_1.default
    }
});
List.belongsToMany(user_old_1.default, { through: 'contributions' });
user_old_1.default.belongsToMany(List, { through: 'contributions' });
exports.default = List;
