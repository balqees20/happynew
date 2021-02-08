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
const itemtype_rout = express_1.default.Router();
itemtype_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM itemtype ", (error, results) => {
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
itemtype_rout.get('/:id', (req, res) => {
    let type_id = req.params['id'];
    console.log("req.body.itemType: " + JSON.stringify(req.body.itemType));
    dbconnection_1.default.query("SELECT * FROM itemtype where id=?", type_id, (err, results) => {
        res.json(results);
    });
});
itemtype_rout.post('/', (req, res) => {
    imageuplodservice_1.default.uploadLocalStorage(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        let files = req.files;
        const imagePath = files.itemType_image[0].path;
        const image = yield imageuplodservice_1.default.uploadCloudinary(imagePath, 'itemType_image');
        dbconnection_1.default.query("INSERT INTO itemtype (id,type_name,type_image) VALUES('" + req.body.id + "','" + req.body.type_name + "','" + image.url + "') ", (err, results) => {
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
itemtype_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM itemtype WHERE id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
itemtype_rout.put('/:id', (req, res) => {
    let id = req.params['id'];
    let P = req.body.itemtype_rout;
    dbconnection_1.default.query(`UPDATE itemtype SET type_name=?,type_image=?`, [P.type_name, P.type_image], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = itemtype_rout;
//# sourceMappingURL=itemtype.js.map