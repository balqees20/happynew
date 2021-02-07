import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import About from "../model/about";

const about_rout = express.Router();

about_rout.get('/', (req, res) => {
    connection.query("SELECT * FROM about", (error, results) => {
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



about_rout.post('/', (req:Request, res:Response) => {
    let A:About = req.body.about;
    
    connection.query("INSERT INTO about (title,description) VALUES('" +A.title+ "','" +A.description+ "') ", (err, results)=>{
        if (err){
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else{
            res.json({'created': 'success'});
        }
    })
});
about_rout.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM about WHERE about_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
about_rout.put('/:about_id', (req:Request, res:Response)=>{
    let id:string = req.params['info_id'];
    let A:About = req.body.about;
    connection.query(`UPDATE about SET title=?,description=?`,
                    [A.title,A.description], 
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



export default about_rout;

