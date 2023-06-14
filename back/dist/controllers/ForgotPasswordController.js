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
const crypto_1 = require("crypto");
const PasswordReset_1 = __importDefault(require("../database/models/PasswordReset"));
const User_1 = __importDefault(require("../database/models/User"));
const Controller_1 = __importDefault(require("./Controller"));
function sendResponse(res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ status: 'ok', message: 'Jeśli email jest powiązany z kontem, wysłano na niego link do resetu hasła!' });
    });
}
class ForgotPasswordController extends Controller_1.default {
    post(req, res) {
        const _super = Object.create(null, {
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const user = yield User_1.default.findOne({
                    where: {
                        email: email
                    }
                });
                if (user === null) {
                    sendResponse(res);
                    return;
                }
                const [request, replaced] = yield PasswordReset_1.default.upsert({
                    id: (0, crypto_1.randomUUID)(),
                    userId: user.id
                });
                console.log(replaced);
                res.status(200).json({ status: 'ok', id: request.id });
            }
            catch (err) {
                _super.internalServerError.call(this, err, res);
            }
        });
    }
}
exports.default = new ForgotPasswordController();
