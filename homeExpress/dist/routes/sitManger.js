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
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middlware/auth");
let mangerRoute = express_1.default.Router();
mangerRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mang = req.body.sitManger;
    // get password hash code
    mang.password = yield bcrypt_1.default.hash(mang.password, 10);
    dbconnection_1.default.query("SELECT * FROM sitmanger WHERE mangerName=?", mang.mangerName, (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ "error": 1 });
        }
        else {
            if (result.length > 0) {
                res.status(409).json({ "success": false, "userexists": true });
            }
            else {
                dbconnection_1.default.query(`INSERT INTO sitmanger (mangerName, password) 
                                VALUES('${mang.mangerName}', '${mang.password}')`, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ 'error': 1 });
                    }
                    else {
                        const token = auth_1.generateAuthToken(mang);
                        res.header("x-auth-token", token).send({
                            _id: mang.sitManger_id,
                            name: mang.mangerName,
                        });
                    }
                });
            }
        }
    });
}));
mangerRoute.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM sitmanger", (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ "error": 1 });
        }
        else {
            res.json(result);
        }
    });
});
mangerRoute.post('/login', (req, res) => {
    let mang = req.body.sitManger;
    dbconnection_1.default.query("SELECT * FROM sitmanger WHERE mangerName=? AND password=?", [mang.mangerName, mang.password], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ "error": 2 });
        }
        else {
            if (result.length > 0) {
                const token = auth_1.generateAuthToken(mang);
                res.header("x-auth-token", token).send({
                    _id: mang.sitManger_id,
                    name: mang.mangerName,
                });
            }
            else {
                res.json({ "AccessDenid": true });
            }
        }
    });
});
exports.default = mangerRoute;
//# sourceMappingURL=sitManger.js.map