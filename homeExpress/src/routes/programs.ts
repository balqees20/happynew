import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import Program from "../model/programs";

const program = express.Router();

program.get('/', (req, res) => {
    connection.query("SELECT * FROM program", (error, results) => {
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
program.get('/:program_id', (req, res) => {
    let id = req.params['program_id'];
    console.log("req.body.program: " + JSON.stringify(req.body.programs));
    connection.query("SELECT * FROM program where program_id=?",id, (err, results)=>{
        res.json(results);
    })
});


program.post('/', (req:Request, res:Response) => {
    let p:Program = req.body.program;
    
    connection.query("INSERT INTO program (pname,description) VALUES ('" +p.pname+ "','" + p.description+ "') ", (err, results)=>{
        if (err){
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else{
            res.json({'created': 'success'});
        }
    })
});
program.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    connection.query("DELETE FROM program WHERE program_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
program.put('/:program_id', (req:Request, res:Response)=>{
    let id:string = req.params['program_id'];
    let program:Program = req.body.PROGRM;
    connection.query(`UPDATE program SET pname=?, description=?`,
                    [program.pname,program.description], 
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



export default program;

