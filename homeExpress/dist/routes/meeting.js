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
const imageuplodservice_1 = __importDefault(require("../service/imageuplodservice"));
const meet_rout = express_1.default.Router();
meet_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM meeting", (error, results) => {
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
    imageuplodservice_1.default.uploadLocalStorage(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        let files = req.files;
        const imagePath = files.meeting_image[0].path;
        const image = yield imageuplodservice_1.default.uploadCloudinary(imagePath, 'meeting_image');
        dbconnection_1.default.query("INSERT INTO meeting (meeting_name,meeting_place,meeting_type ,meeting_date,program_name,meeting_image,description) VALUES('" + req.body.meeting_name + "','" + req.body.meeting_place + "','" + req.body.meeting_type + "','" + req.body.meeting_date + "','" + req.body.program_name + "','" + image.url + "','" + req.body.description + "') ", (err, results) => {
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