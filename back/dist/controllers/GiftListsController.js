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
const jwt = __importStar(require("jsonwebtoken"));
const Gift_1 = __importDefault(require("../database/models/Gift"));
function giftMapper(gift) {
    return { id: gift.id, name: gift.name, image: gift.image, price: gift.price, description: gift.description, taken: gift.taken_by_id !== undefined };
}
exports.default = {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const token = req.cookies['token'];
            if (!token) {
                res.status(401).json({ status: 'error', message: 'Unauthorized!' });
                return;
            }
            const parsedToken = jwt.verify(token, process.env.SECRET);
            try {
                const gifts = yield Gift_1.default.findAll({
                    where: { list_id: id }
                });
                res.status(200).json({ status: 'ok', gifts: gifts.map(giftMapper) });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Internal server error!' });
            }
        });
    },
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { list_id, name, image, price, description } = req.body;
            if (list_id === undefined || name === undefined || image === undefined) {
                res.status(400).json({ status: 'error', message: 'list_id, name, image cannot be null!' });
                return;
            }
            try {
                const gift = yield Gift_1.default.create({
                    list_id: list_id,
                    name: name,
                    image: image,
                    price: price,
                    description: description
                });
                res.status(200).json({ status: 'ok', gift: giftMapper(gift) });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Internal server error!' });
            }
        });
    },
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, list_id, name, image, price, description } = req.body;
            const gift = {
                id: id,
                list_id: list_id,
                name: name,
                image: image,
                price: price,
                description: description
            };
            try {
                const [r] = yield Gift_1.default.update(Object.assign({}, Object.fromEntries(Object.entries(gift).filter((_, v) => v !== null))), {
                    where: { id: id },
                });
                if (r > 0)
                    res.status(200).json({ status: 'ok', message: 'Pomyślnie' });
            }
            finally {
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // PGPool.query("DELETE FROM lists WHERE list_id = $1", [req.body.id])
            //     .then((qres) => {
            //         res.status(200).json({status: "ok"});
            //     }).catch((err) => {
            //         console.log(err);
            //         res.status(500).end();
            //     });
        });
    },
};
