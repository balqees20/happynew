"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = __importDefault(require("../dbconnection"));
const course_route = express_1.default.Router();
course_route.get('/', (req, res) => {
    dbconnection_1.default.query("SELECT * FROM course", (error, results) => {
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
course_route.get('/:coures_id', (req, res) => {
    let id = req.params['coures_id'];
    console.log("req.body.course: " + JSON.stringify(req.body.course));
    dbconnection_1.default.query("SELECT * FROM course where coures_id=?", id, (err, results) => {
        res.json(results);
    });
});
course_route.post('/', (req, res) => {
    let cour = req.body.course;
    dbconnection_1.default.query("INSERT INTO course (coures_id,coures_name,start_date ,last_date,description,coures_image,target_group) VALUES('" + cour.coures_id + "','" + cour.coures_name + "','" + cour.start_date + "','" + cour.last_date + "','" + cour.description + "','" + cour.coures_image + "','" + cour.target_group + "') ", (err, results) => {
        if (err) {
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else {
            res.json({ 'created': 'success' });
        }
    });
});
course_route.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log('I called to delete the item id = ', id);
    dbconnection_1.default.query("DELETE FROM course WHERE coures_id=?", id, (err, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    });
});
course_route.put('/:coures_id', (req, res) => {
    let id = req.params['coures_id'];
    let C = req.body.course;
    dbconnection_1.default.query(`UPDATE course SET coures_name=?,start_date=?,last_date=?,description=?,coures_image=?, target_group=?`, [C.coures_name, C.start_date, C.last_date, C.description, C.coures_image, , C.target_group], (err, results) => {
        if (!err) {
            res.json({ 'updated': id });
        }
        else {
            res.json({ 'error': id });
            console.log(err.message);
        }
    });
});
exports.default = course_route;
//# sourceMappingURL=course.js.map