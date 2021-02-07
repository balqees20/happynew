"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
const program = express_1.default.Router();
program.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM program", (error, results) => {
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
program.get('/:program_id', (req, res) => {
    let id = req.params['program_id'];
    console.log("req.body.program: " + JSON.stringify(req.body.programs));
    dbconnection_1.default.query("SELECT * FROM program where program_id=?", id, (err, results) => {
        res.json(results);
    });
});
program.post('/', (req, res) => {
    let p = req.body.program;
    dbconnection_1.default.query("INSERT INTO program (pname,description) VALUES ('" + p.pname + "','" + p.description + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
});
program.post('/delete', (req, res) => {
    let id = req.body.id;
    dbconnection_1.default.query("DELETE FROM program WHERE program_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
program.put('/:program_id', (req, res) => {
    let id = req.params['program_id'];
    let program = req.body.PROGRM;
    dbconnection_1.default.query(`UPDATE program SET pname=?, description=?`, [program.pname, program.description], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = program;
//# sourceMappingURL=programs.js.map