"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
const item_rout = express_1.default.Router();
item_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM menuitem ORDER BY itemType_id", (error, results) => {
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
item_rout.get('/:itemType_id', (req, res) => {
    let id = req.params['itemType_id'];
    console.log("req.body.menuitem: " + JSON.stringify(req.body.menuitem));
    dbconnection_1.default.query(`SELECT DISTINCT item_name FROM menuitem WHERE itemType_id=${id}`, (error, results) => {
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
item_rout.post('/', (req, res) => {
    let P = req.body.menuitem;
    dbconnection_1.default.query("INSERT INTO menuitem (item_name,price,itemType_id) VALUES('" + P.item_name + "','" + P.price + "','" + P.itemType_id + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
});
item_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM menuitem WHERE item_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
item_rout.put('/:item_id', (req, res) => {
    let id = req.params['act_id'];
    let P = req.body.item_rout;
    dbconnection_1.default.query(`UPDATE menuitem SET item_name=?,price=?,itemType_id=?`, [P.item_name, P.price, P.itemType_id], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = item_rout;
//# sourceMappingURL=menuitem.js.map