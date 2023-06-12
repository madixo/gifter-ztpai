"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const List_1 = __importDefault(require("./List"));
const user_old_1 = __importDefault(require("./user_old"));
const Gift = db_1.default.define('gift', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2)
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    taken_by: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: user_old_1.default
        }
    }
});
Gift.belongsTo(List_1.default);
exports.default = Gift;
