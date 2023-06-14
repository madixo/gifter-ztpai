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
const argon2_1 = require("argon2");
const PasswordReset_1 = __importDefault(require("../database/models/PasswordReset"));
const User_1 = __importDefault(require("../database/models/User"));
const Controller_1 = __importDefault(require("./Controller"));
class PasswordResetController extends Controller_1.default {
    post(req, res) {
        const _super = Object.create(null, {
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { id, password } = req.body;
            try {
                const request = yield PasswordReset_1.default.findOne({
                    where: {
                        id: id
                    },
                    include: User_1.default
                });
                if (request == null) {
                    res.status(400).json({ status: 'error', message: 'Błędne id!' });
                    return;
                }
                request.user.password = yield (0, argon2_1.hash)(password);
                request.user.save();
                res.status(200).json({ status: 'ok', message: 'Pomyślnie zmieniono hasło!' });
            }
            catch (err) {
                _super.internalServerError.call(this, err, res);
            }
        });
    }
}
exports.default = new PasswordResetController();
