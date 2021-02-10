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
const discount_rout = express_1.default.Router();
discount_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM discountitem", (error, results) => {
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
discount_rout.post('/', (req, res) => {
    imageuplodservice_1.default.uploadLocalStorage(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        let files = req.files;
        const imagePath = files.image[0].path;
        const image = yield imageuplodservice_1.default.uploadCloudinary(imagePath, 'image');
        console.log(image.url);
        dbconnection_1.default.query("INSERT INTO discountitem (item_name ,disDate ,disday, oldprice ,dicprice ,image) VALUES('" + req.body.item_name + "','" + req.body.disDate + "','" + req.body.disday + "','" + req.body.oldprice + "','" + req.body.dicprice + "','" + image.url + "') ", (err, results) => {
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
discount_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM discountitem WHERE disitem_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
exports.default = discount_rout;
//# sourceMappingURL=discount.js.map