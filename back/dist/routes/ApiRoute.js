"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContributionsController_1 = __importDefault(require("../controllers/ContributionsController"));
const GiftListsController_1 = __importDefault(require("../controllers/GiftListsController"));
const ListsController_1 = __importDefault(require("../controllers/ListsController"));
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const RegisterController_1 = __importDefault(require("../controllers/RegisterController"));
const router = (0, express_1.Router)();
router.get('/user/:id/lists', ListsController_1.default.get);
router.get('/user/:id/contributions', ContributionsController_1.default.get);
router.post('/register', RegisterController_1.default.post);
router.post('/login', LoginController_1.default.post);
router.get('/list/:id', GiftListsController_1.default.get);
router.delete('/list/:id', GiftListsController_1.default.delete);
router.post('/list', GiftListsController_1.default.post);
router.patch('/list/:id', GiftListsController_1.default.patch);
router.get('/cookie', (req, res) => {
    res.status(200).json({ 'signed': req.signedCookies, 'cookies': req.cookies });
});
exports.default = router;
