import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import activity from "../model/activity";
import upload from "../service/imageuplodservice";


const active = express.Router();

active.get('/', (req, res) => {
    connection.query("SELECT * FROM activity", (error, results) => {
      // npmstartconsole.log("username from token: " + req.body.user.id)
        if (error){
            console.log("MYSQL ERROR " + error);
            res.json({"error":1})
        }
        else {
            res.json(results);
        }
        
    })
});
active.get('/:act_id', (req, res) => {
    let id = req.params['act_id'];
    console.log("req.body.active: " + JSON.stringify(req.body.activity));
    connection.query("SELECT * FROM activity where act_id=?",id, (err, results)=>{
        res.json(results);
    })
});


active.post('/', (req:Request, res:Response) => {

    upload.uploadLocalStorage(req, res, async (error: any) => {
        let files: any = req.files
        const imagePath = files.act_image[0].path;
        const image: any = await upload.uploadCloudinary(
            imagePath,
            'act_image'
        );
        connection.query("INSERT INTO activity (act_name,act_place,act_type ,act_date,act_image,description) VALUES('" +req.body.act_name+ "','" +req.body.act_place+ "','" +req.body.act_type+ "','" +req.body.act_date+ "','" +image.url+ "','" + req.body.description+ "') ", (err, results)=>{
            if (err){
                console.log("SQL ERROR " + err);
                res.json(err);
            }
            else{
                res.json({'created': 'success'});
            }
        })

    })
  
    
    
});
active.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM activity WHERE act_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
active.put('/:act_id', (req:Request, res:Response)=>{
    let id:string = req.params['act_id'];
    let A:activity = req.body.activity;
    connection.query(`UPDATE activity SET act_name=?,act_place=?,act_type=?,act_date=?,act_image=?, description=?`,
                    [A.act_name,A.act_place,A.act_type,A.act_date,A.act_image,A.description], 
                    (err:MysqlError, results)=>{
                        if(!err){
                            res.json({'updated':id})
                        }
                        else{
                            res.json({'error':id})
                            console.log(err.message);
                        }
                    })
})



export default active;

