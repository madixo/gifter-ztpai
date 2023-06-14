"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const argon = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
const Role_1 = __importDefault(require("../database/models/Role"));
const User_1 = __importDefault(require("../database/models/User"));
const Controller_1 = __importDefault(require("./Controller"));
class LoginController extends Controller_1.default {
    post(req, res) {
        const _super = Object.create(null, {
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const user = yield User_1.default.findOne({ where: { email: data.email }, include: Role_1.default });
                if (user == null) {
                    res.status(200).json({ status: 'error', message: 'Email lub hasło nieprawidłowe!' });
                    return;
                }
                if (yield argon.verify(user.password, data.password))
                    res.status(200).json({
                        status: 'ok',
                        message: 'Pomyślnie zalogowano!',
                        token: jwt.sign({
                            email: user.email,
                            role: user.role.name
                        }, process.env.SECRET, {
                            subject: user.id.toString()
                        })
                    });
                else
                    res.status(200).json({ status: 'error', message: 'Email lub hasło nieprawidłowe!' });
            }
            catch (err) {
                _super.internalServerError.call(this, err, res);
            }
        });
    }
}
;
exports.default = new LoginController();
