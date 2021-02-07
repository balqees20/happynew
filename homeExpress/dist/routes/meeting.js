"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
//import imageupload from '../middlware/imageupload';
const meet_rout = express_1.default.Router();
//const _upload = imageupload();
meet_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM meeting", (error, results) => {
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
meet_rout.get('/:meeting_id', (req, res) => {
    let id = req.params['meeting_id'];
    console.log("req.body.meeting: " + JSON.stringify(req.body.meeting));
    dbconnection_1.default.query("SELECT * FROM meeting where meeting_id=?", id, (err, results) => {
        res.json(results);
    });
});
meet_rout.post('/', (req, res) => {
    let M = req.body.meeting;
    dbconnection_1.default.query("INSERT INTO meeting (meeting_name,meeting_place,meeting_type ,meeting_date,program_name,meeting_image,description) VALUES('" + M.meeting_name + "','" + M.meeting_place + "','" + M.meeting_type + "','" + M.meeting_date + "','" + M.program_name + "','" + M.meeting_image + "','" + M.description + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
});
meet_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM meeting WHERE meeting_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
meet_rout.put('/:meeting_id', (req, res) => {
    let id = req.params['meeting_id'];
    let M = req.body.meeting;
    dbconnection_1.default.query(`UPDATE meeting SET meeting_name=?,meeting_place=?,meeting_type=?,meeting_date=?,program_name=?,meeting_image=?,description=?`, [M.program_name, M.meeting_place, M.meeting_type, M.meeting_date, M.program_name, M.meeting_image, M.description], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = meet_rout;
//# sourceMappingURL=meeting.js.map