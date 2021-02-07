"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = require('config');
let auth = (req, res, next) => {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token)
        return res.status(401).send("Access denied. No token provided.");
    console.log("token: " + token);
    console.log("token[0]: " + token[0]);
    console.log("token[1]: " + token[1]);
    try {
        const decoded = jsonwebtoken_1.default.verify(token.toString(), "abcd");
        req.body.sitManger = decoded;
        next();
    }
    catch (ex) {
        console.log(ex);
        res.status(400).send("Invalid token.");
    }
};
let generateAuthToken = (u) => {
    const token = jsonwebtoken_1.default.sign({ sitManger_id: u.mangerName }, "abcd");
    return token;
};
exports.generateAuthToken = generateAuthToken;
exports.default = auth;
//# sourceMappingURL=auth.js.map