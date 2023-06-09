"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../models/User"));
const Contribution_1 = __importDefault(require("./Contribution"));
const Gift_1 = __importDefault(require("./Gift"));
let List = class List extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT),
    __metadata("design:type", Number)
], List.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], List.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], List.prototype, "accessCode", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], List.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.default, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", User_1.default)
], List.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Gift_1.default, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], List.prototype, "gifts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.default, () => Contribution_1.default),
    __metadata("design:type", Array)
], List.prototype, "contributors", void 0);
List = __decorate([
    sequelize_typescript_1.Table
], List);
exports.default = List;
