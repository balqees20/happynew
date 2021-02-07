"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
const about_rout = express_1.default.Router();
about_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM about", (error, results) => {
        // npmstartconsole.log("username from token: " + req.body.user.id)
        if (error) {
            console.log("MYSQL ERROR " + error);
            res.json({ "error": 1 });
        }
        else {
            res.json(results);
        }
    });
});
about_rout.post('/', (req, res) => {
    let A = req.body.about;
    dbconnection_1.default.query("INSERT INTO about (title,description) VALUES('" + A.title + "','" + A.description + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
});
about_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM about WHERE about_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
about_rout.put('/:about_id', (req, res) => {
    let id = req.params['info_id'];
    let A = req.body.about;
    dbconnection_1.default.query(`UPDATE about SET title=?,description=?`, [A.title, A.description], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = about_rout;
//# sourceMappingURL=about.js.map