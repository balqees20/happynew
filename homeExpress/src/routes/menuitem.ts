import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
//import {generateAuthToken} from "../middlware/auth";
import ITEM from "../model/menuitem";
import ITEMTYPE from "../model/itemType"

const item_rout = express.Router();

item_rout.get('/', (req, res) => {
    connection.query("SELECT * FROM menuitem ORDER BY itemType_id", (error, results) => {
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
item_rout.get('/:itemType_id', (req, res) => {
    let id = req.params['itemType_id'];
    console.log("req.body.menuitem: " + JSON.stringify(req.body.menuitem));
    connection.query(`SELECT DISTINCT item_name FROM menuitem WHERE itemType_id=${id}`, (error, results) => {
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





item_rout.post('/', (req:Request, res:Response) => {
    let P:ITEM = req.body.menuitem;
    
    connection.query("INSERT INTO menuitem (item_name,price,itemType_id) VALUES('" +P.item_name+"','" +P.price+ "','" +P.itemType_id+ "') ", (err, results)=>{
        if (err){
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else{
            res.json({'created': 'success'});
        }
    })
});
item_rout.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM menuitem WHERE item_id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
item_rout.put('/:item_id', (req:Request, res:Response)=>{
    let id:string = req.params['act_id'];
    let P:ITEM = req.body.item_rout;
    connection.query(`UPDATE menuitem SET item_name=?,price=?,itemType_id=?`,
                    [P.item_name,P.price,P.itemType_id], 
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



export default item_rout;

