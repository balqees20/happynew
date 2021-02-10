import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
import {generateAuthToken} from "../middlware/auth";
import Cnews from "../model/news"
import Smanger from "./sitManger";
//import { TokenExpiredError } from "jsonwebtoken";
import upload from "../service/imageuplodservice";


const news = express.Router();

news.get('/',(req,res) =>{
    connection.query("SELECT * FROM news",(error, results) => {
        if(error){
            console.log("MYSQL ERROR"+ error);
            res.json({"error":1});
        }
        else{
            res.json(results);
        }
    })

});
news.get('/:news_id', (req, res) => {
    let id = req.params['news_id'];
    console.log("req.body.news: " + JSON.stringify(req.body.news));
    connection.query("SELECT * FROM news where news_id=?",id, (err, results)=>{
        res.json(results);
    })
});

news.post('/', (req:Request, res:Response) => {
    upload.uploadLocalStorage(req, res, async (error: any) => {
        let files: any = req.files
        const imagePath = files.N_image[0].path;
        const image: any = await upload.uploadCloudinary(
            imagePath,
            'N_image'
        );
    
    connection.query("INSERT INTO news (news_title , date , description,N_image) VALUES ('" +req.body.news_title+ "','" + req.body.date+ "','" + req.body.description+ "','" +image.url+ "') ", (err, results)=>{
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
news.post('/delete',Smanger, (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM news WHERE news_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
news.put('/:news_id', (req:Request, res:Response)=>{
    let id:string = req.params['news_id'];
    let N:Cnews = req.body.news;
    connection.query(`UPDATE news SET news_title=?, description=?`,
                    [N.news_title,N.description], 
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



export default news;