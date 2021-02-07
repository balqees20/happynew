import express, { Router } from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import MEETIGN from "../model/meeting";
import upload from "../service/imageuplodservice";

//import imageupload from '../middlware/imageupload';

const meet_rout = express.Router();
//const _upload = imageupload();
meet_rout.get('/', (req, res) => {


    connection.query("SELECT * FROM meeting", (error, results) => {
        // npmstartconsole.log("username from token: " + req.body.user.id)
        if (error) {
            console.log("MYSQL ERROR " + error);
            res.json({ "error": 1 })
        }
        else {
            res.json(results);
        }

    })
});

meet_rout.get('/:meeting_id', (req, res) => {
    let id = req.params['meeting_id'];
    console.log("req.body.meeting: " + JSON.stringify(req.body.meeting));
    connection.query("SELECT * FROM meeting where meeting_id=?", id, (err, results) => {
        res.json(results);
    })
});


meet_rout.post('/', (req: Request, res: Response) => {
    upload.uploadLocalStorage(req, res, async (error: any) => {
        let files: any = req.files
        const imagePath = files.meeting_image[0].path;
        const image: any = await upload.uploadCloudinary(
            imagePath,
            'meeting_image'
        );
        connection.query("INSERT INTO meeting (meeting_name,meeting_place,meeting_type ,meeting_date,program_name,meeting_image,description) VALUES('" + req.body.meeting_name + "','" + req.body.meeting_place + "','" + req.body.meeting_type + "','" + req.body.meeting_date + "','" + req.body.program_name + "','" + image.url + "','" + req.body.description + "') ", (err, results) => {
            if (err) {
                console.log("SQL ERROR " + err);
                res.json(err);
            }
            else {
                res.json({ 'created': 'success' });
            }
        })

    })

});
meet_rout.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM meeting WHERE meeting_id=?", id, (err: MysqlError, results) => {
        if (!err) {
            res.json({ 'deleted': id });
        }
        else {
            res.json(err.message);
            console.log(err.message);
        }
    })
});
meet_rout.put('/:meeting_id', (req: Request, res: Response) => {
    let id: string = req.params['meeting_id'];
    let M: MEETIGN = req.body.meeting;
    connection.query(`UPDATE meeting SET meeting_name=?,meeting_place=?,meeting_type=?,meeting_date=?,program_name=?,meeting_image=?,description=?`,
        [M.program_name, M.meeting_place, M.meeting_type, M.meeting_date, M.program_name, M.meeting_image, M.description],
        (err: MysqlError, results) => {
            if (!err) {
                res.json({ 'updated': id })
            }
            else {
                res.json({ 'error': id })
                console.log(err.message);
            }
        })
})



export default meet_rout;
