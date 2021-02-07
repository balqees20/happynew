import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import CAMP from "../model/camp";
import upload from "../service/imageuplodservice";



const camp_rout = express.Router();

camp_rout.get('/', (req, res) => {
    connection.query("SELECT * FROM camp", (error, results) => {
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
camp_rout.get('/:camp_id', (req, res) => {
    let id = req.params['camp_id'];
    console.log("req.body.camp: " + JSON.stringify(req.body.CAMP));
    connection.query("SELECT * FROM camp where camp_id=?",id, (err, results)=>{
        res.json(results);
    })
});


camp_rout.post('/', (req:Request, res:Response) => {
    upload.uploadLocalStorage(req, res, async (error: any) => {
        let files: any=req.files
        const imagePath = files.camp_image[0].path;
        const image:any = await upload.uploadCloudinary(
            imagePath,
            'camp_image'
          );
          console.log(image.url)
          connection.query("INSERT INTO camp (camp_name,season,start_date ,last_date,target_group,description,camp_image) VALUES('" +req.body.camp_name+ "','" +req.body.season+ "','" +req.body.start_date+ "','" +req.body.last_date+ "','"+req.body.target_group+"','"+req.body.description+"','"+image.url+"') ", (err, results)=>{
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
camp_rout.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM camp WHERE camp_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
camp_rout.put('/:camp_id', (req:Request, res:Response)=>{
    let id:string = req.params['camp_id'];
    let C:CAMP = req.body.camp;
    connection.query(`UPDATE camp SET camp_name=?,season=?,start_date=?,last_date=?,target_group=?,description=?,camp_image=?`,
                    [C.camp_name,C.season,C.start_date,C.last_date,C.target_group,C.description,C.camp_image], 
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



export default  camp_rout;

