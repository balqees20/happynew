"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
//import { TokenExpiredError } from "jsonwebtoken";
const contact_rout = express_1.default.Router();
contact_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM contact", (error, results) => {
        if (error) {
            console.log("MYSQL ERROR" + error);
            res.json({ "error": 1 });
        }
        else {
            res.json(results);
        }
    });
});
contact_rout.get('/:visitor_id', (req, res) => {
    let id = req.params['visitor_id'];
    console.log("req.body.news: " + JSON.stringify(req.body.contactv));
    dbconnection_1.default.query("SELECT * FROM contact where visitor_id=?", id, (err, results) => {
        res.json(results);
    });
});
contact_rout.post('/', (req, res) => {
    let C = req.body.contactv;
    dbconnection_1.default.query("INSERT INTO contact (username , email ,phone_no , vmassage) VALUES ('" + C.username + "','" + C.email + "','" + C.phone_no + "','" + C.vmassage + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
});
contact_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM contact WHERE visitor_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
contact_rout.put('/:visitor_id', (req, res) => {
    let id = req.params['visitor_id'];
    let N = req.body.contactv;
    dbconnection_1.default.query(`UPDATE contact SET username=?,email=?,phone_no=?,vmassage=? `, [N.username, N.email, N.phone_no, N.vmassage], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = contact_rout;
//# sourceMappingURL=contactv.js.map