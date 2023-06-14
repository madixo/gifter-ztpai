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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class Controller {
    defaultResponse(res) { res.status(404).json({ status: 'error', message: 'Not found!' }); }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () { this.defaultResponse(res); });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () { this.defaultResponse(res); });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () { this.defaultResponse(res); });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () { this.defaultResponse(res); });
    }
    verifyRequest(req, res) {
        const token = req.cookies['token'];
        if (!token) {
            res.status(401).json({ status: 'error', message: 'Unauthorized!' });
            return;
        }
        let parsedToken;
        try {
            parsedToken = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        }
        catch (err) {
            console.log(err);
            res.status(401).json({ status: 'error', message: 'Unauthorized!' });
        }
        return parsedToken;
    }
    internalServerError(err, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Internal server error! Contact with administrator.' });
        });
    }
}
exports.default = Controller;
