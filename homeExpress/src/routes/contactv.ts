import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import contact from "../model/contactv"
//import { TokenExpiredError } from "jsonwebtoken";

const contact_rout = express.Router();

contact_rout.get('/',(req,res) =>{
    connection.query("SELECT * FROM contact",(error, results) => {
        if(error){
            console.log("MYSQL ERROR"+ error);
            res.json({"error":1});
        }
        else{
            res.json(results);
        }
    })

});
contact_rout.get('/:visitor_id', (req, res) => {
    let id = req.params['visitor_id'];
    console.log("req.body.news: " + JSON.stringify(req.body.contactv));
    connection.query("SELECT * FROM contact where visitor_id=?",id, (err, results)=>{
        res.json(results);
    })
});

contact_rout.post('/', (req:Request, res:Response) => {
    let C:contact = req.body.contactv;
    
    connection.query("INSERT INTO contact (username , email ,phone_no , vmassage) VALUES ('" +C.username+ "','" + C.email+ "','" + C.phone_no+ "','" + C.vmassage+ "') ", (err, results)=>{
        if (err){
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else{
            res.json({'created': 'success'});
        }
    })
});
contact_rout.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM contact WHERE visitor_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
contact_rout.put('/:visitor_id', (req:Request, res:Response)=>{
    let id:string = req.params['visitor_id'];
    let N:contact = req.body.contactv;
    connection.query(`UPDATE contact SET username=?,email=?,phone_no=?,vmassage=? `,
                    [N.username,N.email,N.phone_no,N.vmassage], 
                    (err:MysqlError, results)=>{
                        if(!err){
                            res.json({'updated':id})
                        }
                        else{
                            res.json({'error':id})
                            console.log(err.message);
                        }
                    })
});



export default contact_rout;