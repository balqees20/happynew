import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import COURSE from "../model/course";

const course_route = express.Router();

course_route.get('/', (req, res) => {
    connection.query("SELECT * FROM course", (error, results) => {
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
course_route.get('/:coures_id', (req, res) => {
    let id = req.params['coures_id'];
    console.log("req.body.course: " + JSON.stringify(req.body.course));
    connection.query("SELECT * FROM course where coures_id=?",id, (err, results)=>{
        res.json(results);
    })
});

course_route.post('/', (req:Request, res:Response) => {
    let cour:COURSE = req.body.course;
    
    connection.query("INSERT INTO course (coures_id,coures_name,start_date ,last_date,description,coures_image,target_group) VALUES('" +cour.coures_id+ "','" +cour.coures_name+ "','" +cour.start_date+ "','" +cour.last_date+ "','" +cour.description+ "','" +cour.coures_image+ "','" +cour.target_group+ "') ", (err, results)=>{
        if (err){
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else{
            res.json({'created': 'success'});
        }
    })
});

course_route.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM course WHERE coures_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
course_route.put('/:coures_id', (req:Request, res:Response)=>{
    let id:string = req.params['coures_id'];
    let C:COURSE = req.body.course;
    connection.query(`UPDATE course SET coures_name=?,start_date=?,last_date=?,description=?,coures_image=?, target_group=?`,
                    [C.coures_name,C.start_date,C.last_date,C.description,C.coures_image,,C.target_group], 
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



export default course_route;

