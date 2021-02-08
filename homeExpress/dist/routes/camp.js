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
const camp_rout = express_1.default.Router();
camp_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM camp", (error, results) => {
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
camp_rout.get('/:camp_id', (req, res) => {
    let id = req.params['camp_id'];
    console.log("req.body.camp: " + JSON.stringify(req.body.CAMP));
    dbconnection_1.default.query("SELECT * FROM camp where camp_id=?", id, (err, results) => {
        res.json(results);
    });
});
camp_rout.post('/', (req, res) => {
    imageuplodservice_1.default.uploadLocalStorage(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        let files = req.files;
        const imagePath = files.camp_image[0].path;
        const image = yield imageuplodservice_1.default.uploadCloudinary(imagePath, 'camp_image');
        console.log(image.url);
        dbconnection_1.default.query("INSERT INTO camp (camp_name,season,start_date ,last_date,target_group,description,camp_image) VALUES('" + req.body.camp_name + "','" + req.body.season + "','" + req.body.start_date + "','" + req.body.last_date + "','" + req.body.target_group + "','" + req.body.description + "','" + image.url + "') ", (err, results) => {
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
camp_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM camp WHERE camp_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
camp_rout.put('/:camp_id', (req, res) => {
    let id = req.params['camp_id'];
    let C = req.body.camp;
    dbconnection_1.default.query(`UPDATE camp SET camp_name=?,season=?,start_date=?,last_date=?,target_group=?,description=?,camp_image=?`, [C.camp_name, C.season, C.start_date, C.last_date, C.target_group, C.description, C.camp_image], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = camp_rout;
//# sourceMappingURL=camp.js.map