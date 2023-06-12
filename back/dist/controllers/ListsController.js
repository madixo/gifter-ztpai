"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = __importDefault(require("../database/models/List"));
exports.default = {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const lists = yield List_1.default.findAll({
                    where: { ownerId: id }
                });
                res.status(200).json({ status: 'ok', lists: lists.map(list => ({ id: list.id, name: list.name, access_code: list.access_code })) });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Internal server errror!' });
            }
        });
    },
};
