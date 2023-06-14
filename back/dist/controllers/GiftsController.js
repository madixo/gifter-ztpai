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
const Gift_1 = __importDefault(require("../database/models/Gift"));
const List_1 = __importDefault(require("../database/models/List"));
const Controller_1 = __importDefault(require("./Controller"));
function giftMapper(gift) {
    return { id: gift.id, name: gift.name, image: gift.image, price: gift.price, description: gift.description, taken: gift.takenById !== null };
}
class GiftsController extends Controller_1.default {
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
            let list;
            try {
                list = yield List_1.default.findOne({
                    where: {
                        id: id
                    },
                    include: {
                        model: Gift_1.default,
                        required: true
                    }
                });
            }
            catch (err) {
                _super.internalServerError.call(this, err, res);
                return;
            }
            if (list === null) {
                res.status(404).json({ status: 'error', message: 'List not found!' });
                return;
            }
            if (parsedToken.sub !== list.ownerId.toString()) {
                res.status(401).json({ status: 'error', message: 'Unauthorized!' });
                return;
            }
            res.status(200).json({ status: 'ok', id: list.id, name: list.name, accessCode: list.accessCode, gifts: list.gifts.map(giftMapper) });
        });
    }
    post(req, res) {
        const _super = Object.create(null, {
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { listId, name, image, price, description } = req.body;
            if (listId === undefined || name === undefined || image === undefined) {
                res.status(400).json({ status: 'error', message: 'listId, name, image cannot be null!' });
                return;
            }
            try {
                const gift = yield Gift_1.default.create({
                    listId: listId,
                    name: name,
                    image: image,
                    price: price,
                    description: description
                });
                res.status(200).json({ status: 'ok', gift: giftMapper(gift) });
            }
            catch (err) {
                _super.internalServerError.call(this, err, res);
            }
        });
    }
    patch(req, res) {
        const _super = Object.create(null, {
            internalServerError: { get: () => super.internalServerError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { id, listId, name, image, price, description } = req.body;
            const gift = {
                id: id,
                listId: listId,
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
            catch (err) {
                _super.internalServerError.call(this, err, res);
            }
        });
    }
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
    }
}
;
exports.default = new GiftsController();
