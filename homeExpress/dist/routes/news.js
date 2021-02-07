"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
const sitManger_1 = __importDefault(require("./sitManger"));
//import { TokenExpiredError } from "jsonwebtoken";
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
    let news = req.body.news;
    dbconnection_1.default.query("INSERT INTO news (news_title , date , description) VALUES ('" + news.news_title + "','" + news.date + "','" + news.description + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
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