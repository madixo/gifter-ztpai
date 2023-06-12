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
require('dotenv').config();
const argon = __importStar(require("argon2"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("process");
const db_1 = __importDefault(require("./database/db"));
const Gift_1 = __importDefault(require("./database/models/Gift"));
const List_1 = __importDefault(require("./database/models/List"));
const Role_1 = __importDefault(require("./database/models/Role"));
const User_1 = __importDefault(require("./database/models/User"));
const ApiRoute_1 = __importDefault(require("./routes/ApiRoute"));
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).end();
};
db_1.default.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Role_1.default.create({ name: 'Admin' });
    yield Role_1.default.create({ name: 'User' });
    yield Role_1.default.create({ name: 'Anon' });
    let user = yield User_1.default.create({ email: 'admin@gifter.pl', password: yield argon.hash('Alamakota1!') });
    let list = yield List_1.default.create({ name: 'Andrzejki', access_code: 123123, ownerId: user.id });
    yield Gift_1.default.bulkCreate([
        { name: 'Telewizor', image: 'http', list_id: list.id },
        { name: 'Telewizor', image: 'http', list_id: list.id },
        { name: 'Telewizor', image: 'http', list_id: list.id },
        { name: 'Telewizor', image: 'http', list_id: list.id },
    ]);
    list = yield List_1.default.create({ name: 'Mikolajki', access_code: 321321, ownerId: user.id });
    yield Gift_1.default.bulkCreate([
        { name: 'Mikrofala', image: 'http', list_id: list.id },
        { name: 'Mikrofala', image: 'http', list_id: list.id },
        { name: 'Mikrofala', image: 'http', list_id: list.id },
        { name: 'Mikrofala', image: 'http', list_id: list.id },
        { name: 'Mikrofala', image: 'http', list_id: list.id },
    ]);
}));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use((0, cookie_parser_1.default)(process.env.secret));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', ApiRoute_1.default);
// app.use((req, res, next) => {
//     if(/(.ico|.js|.css|.jpg|.png|.map|.webp)$/i.test(req.path)) {
//         next();
//     }else {
//         res.header('Cache-Contorl', 'private, no-chache, no-store, must-revalidate');
//         res.header('Expires', '-1');
//         res.header('Pragma', 'no-cache');
//         res.sendFile(path.join(__dirname, '../../front/build', 'index.html'));
//     }
// });
// app.use(express.static(path.join(__dirname, '../../front/build')));
app.use(errorHandler);
try {
    app.listen(3001, () => {
        console.log('express running on port 3001');
    });
}
catch (err) {
    console.log(err);
}
process.on('exit', () => { db_1.default.close(); });
