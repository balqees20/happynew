import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
import CAMP from "../model/discountitem";
import upload from "../service/imageuplodservice";



const discount_rout = express.Router();

discount_rout.get('/', (req, res) => {
    connection.query("SELECT * FROM discountitem", (error, results) => {
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


discount_rout.post('/', (req:Request, res:Response) => {
    upload.uploadLocalStorage(req, res, async (error: any) => {
        let files: any=req.files
        const imagePath = files.image[0].path;
        const image:any = await upload.uploadCloudinary(
            imagePath,
            'image'
          );
          console.log(image.url)
          connection.query("INSERT INTO discountitem (item_name ,disDate ,disday, oldprice ,dicprice ,image) VALUES('" +req.body.item_name+ "','" +req.body.disDate+ "','" +req.body.disday+ "','" +req.body.oldprice+ "','"+req.body.dicprice+"','"+image.url+"') ", (err, results)=>{
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
discount_rout.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM discountitem WHERE disitem_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});


export default  discount_rout;

