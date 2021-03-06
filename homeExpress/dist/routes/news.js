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
const sitManger_1 = __importDefault(require("./sitManger"));
//import { TokenExpiredError } from "jsonwebtoken";
const imageuplodservice_1 = __importDefault(require("../service/imageuplodservice"));
const news = express_1.default.Router();
news.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM news", (error, results) => {
        if (error) {
            console.log("MYSQL ERROR" + error);
            res.json({ "error": 1 });
        }
        else {
            res.json(results);
        }
    });
});
news.get('/:news_id', (req, res) => {
    let id = req.params['news_id'];
    console.log("req.body.news: " + JSON.stringify(req.body.news));
    dbconnection_1.default.query("SELECT * FROM news where news_id=?", id, (err, results) => {
        res.json(results);
    });
});
news.post('/', (req, res) => {
    imageuplodservice_1.default.uploadLocalStorage(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        let files = req.files;
        const imagePath = files.N_image[0].path;
        const image = yield imageuplodservice_1.default.uploadCloudinary(imagePath, 'N_image');
        dbconnection_1.default.query("INSERT INTO news (news_title , date , description,N_image) VALUES ('" + req.body.news_title + "','" + req.body.date + "','" + req.body.description + "','" + image.url + "') ", (err, results) => {
            if (err) {
                console.log("SQL ERROR " + err);
                res.json(err);
            }
            else {
                res.json({ 'created': 'success' });
            }
        });
    }));
});
news.post('/delete', sitManger_1.default, (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM news WHERE news_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
news.put('/:news_id', (req, res) => {
    let id = req.params['news_id'];
    let N = req.body.news;
    dbconnection_1.default.query(`UPDATE news SET news_title=?, description=?`, [N.news_title, N.description], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = news;
//# sourceMappingURL=news.js.map