"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
const prod_rout = express_1.default.Router();
prod_rout.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM product ORDER BY product_type", (error, results) => {
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
prod_rout.get('/:product_type', (req, res) => {
    dbconnection_1.default.query("SELECT DISTINCT product_type FROM product", (error, results) => {
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
prod_rout.get('/:product_id', (req, res) => {
    let id = req.params['product_id'];
    console.log("req.body.product: " + JSON.stringify(req.body.product));
    dbconnection_1.default.query("SELECT * FROM product where product_id=?", id, (err, results) => {
        res.json(results);
    });
});
prod_rout.post('/', (req, res) => {
    let P = req.body.product;
    dbconnection_1.default.query("INSERT INTO product (product_name,product_type,product_image , prodect_price) VALUES('" + P.product_name + "','" + P.product_type + "','" + P.product_image + "','" + P.prodect_price + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
});
prod_rout.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM product WHERE product_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
prod_rout.put('/:product_id', (req, res) => {
    let id = req.params['act_id'];
    let P = req.body.prod_rout;
    dbconnection_1.default.query(`UPDATE product SET product_name=?,product_type=?,product_image=?,product_price=?`, [P.product_name, P.product_type, P.product_image, P.prodect_price], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = prod_rout;
//# sourceMappingURL=product.js.map