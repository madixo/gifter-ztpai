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
const Controller_1 = __importDefault(require("./Controller"));
class ListsController extends Controller_1.default {
    get(req, res) {
        const _super = Object.create(null, {
            verifyRequest: { get: () => super.verifyRequest },
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const parsedToken = _super.verifyRequest.call(this, req, res);
            if (!parsedToken)
                return;
            try {
                const lists = yield List_1.default.findAll({
                    where: { ownerId: id }
                });
                res.status(200).json({ status: 'ok', lists: lists.map(list => ({ id: list.id, name: list.name, accessCode: list.accessCode })) });
            }
            catch (err) {
                _super.internalServerError.call(this, err, res);
            }
        });
    }
    post(req, res) {
        const _super = Object.create(null, {
            verifyRequest: { get: () => super.verifyRequest },
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const parsedToken = _super.verifyRequest.call(this, req, res);
            if (!parsedToken)
                return;
            let list;
            for (let i = 0; i < 1000; i++) {
                try {
                    list = yield List_1.default.create({
                        name: name,
                        accessCode: Math.floor(Math.random() * 999999),
                        ownerId: Number.parseInt(parsedToken.sub)
                    });
                    break;
                }
                catch (err) {
                    continue;
                }
            }
            if (list === undefined)
                _super.internalServerError.call(this, {}, res);
            else
                res.status(200).json({ status: 'ok', message: 'Pomyślnie dodano listę!', list: { id: list.id, name: list.name, accessCode: list.accessCode } });
        });
    }
    delete(req, res) {
        const _super = Object.create(null, {
            verifyRequest: { get: () => super.verifyRequest },
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { ids } = req.body;
            const parsedToken = _super.verifyRequest.call(this, req, res);
            if (!parsedToken)
                return;
            if (id) {
                try {
                    const status = yield List_1.default.destroy({
                        where: {
                            id: id,
                            ownerId: parsedToken.sub
                        },
                        cascade: true
                    });
                    if (status != 0)
                        res.status(200).json({ status: 'ok', message: 'Pomyślnie usunięto listę!' });
                    else
                        _super.internalServerError.call(this, {}, res);
                }
                catch (err) {
                    _super.internalServerError.call(this, err, res);
                }
            }
            else if (ids) {
                try {
                    const status = yield List_1.default.destroy({
                        where: {
                            id: ids,
                            ownerId: parsedToken.sub
                        },
                        cascade: true
                    });
                    if (status != 0)
                        res.status(200).json({ status: 'ok', message: 'Pomyślnie usunięto listy!' });
                    else
                        _super.internalServerError.call(this, {}, res);
                }
                catch (err) {
                    _super.internalServerError.call(this, err, res);
                }
            }
        });
    }
}
exports.default = new ListsController();
