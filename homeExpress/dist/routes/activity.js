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
const active = express_1.default.Router();
active.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM activity", (error, results) => {
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
active.get('/:act_id', (req, res) => {
    let id = req.params['act_id'];
    console.log("req.body.active: " + JSON.stringify(req.body.activity));
    dbconnection_1.default.query("SELECT * FROM activity where act_id=?", id, (err, results) => {
        res.json(results);
    });
});
active.post('/', (req, res) => {
    imageuplodservice_1.default.uploadLocalStorage(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        let files = req.files;
        const imagePath = files.act_image[0].path;
        const image = yield imageuplodservice_1.default.uploadCloudinary(imagePath, 'act_image');
        dbconnection_1.default.query("INSERT INTO activity (act_name,act_place,act_type ,act_date,act_image,description) VALUES('" + req.body.act_name + "','" + req.body.act_place + "','" + req.body.act_type + "','" + req.body.act_date + "','" + image.url + "','" + req.body.description + "') ", (err, results) => {
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
active.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM activity WHERE act_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
active.put('/:act_id', (req, res) => {
    let id = req.params['act_id'];
    let A = req.body.activity;
    dbconnection_1.default.query(`UPDATE activity SET act_name=?,act_place=?,act_type=?,act_date=?,act_image=?, description=?`, [A.act_name, A.act_place, A.act_type, A.act_date, A.act_image, A.description], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = active;
//# sourceMappingURL=activity.js.map