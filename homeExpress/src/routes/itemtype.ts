import express from "express";
import connection from '../dbconnection';
import { Request, Response } from "express-serve-static-core";
import { MysqlError } from 'mysql';
import {generateAuthToken} from "../middlware/auth";
import ITEMTYPE from "../model/itemtype"

const itemtype_rout = express.Router();

itemtype_rout.get('/', (req, res) => {
    connection.query("SELECT * FROM itemtype ", (error, results) => {
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



itemtype_rout.get('/:id', (req, res) => {
    let type_id = req.params['id'];
    console.log("req.body.itemType: " + JSON.stringify(req.body.itemType));
    connection.query("SELECT * FROM itemtype where id=?",type_id, (err, results)=>{
        res.json(results);
    })
});


itemtype_rout.post('/', (req:Request, res:Response) => {
    let y:ITEMTYPE = req.body.itemtype;
    connection.query("INSERT INTO itemtype (id,type_name,type_image) VALUES('" +y.id+"','" +y.type_name+"','" +y.type_image+ "') ", (err, results)=>{
        if (err){
            console.log("SQL ERROR " + err);
            res.json(err);
        }
        else{
            res.json({'created': 'success'});
        }
    })
});
itemtype_rout.post('/delete', (req: Request, res: Response) => {
    let id: string = req.body.id;
    console.log('I called to delete the item id = ', id);
    connection.query("DELETE FROM itemtype WHERE id=?", id, (err: MysqlError, results)=>{
        if (!err){
            res.json({'deleted':id});
        }
        else{
            res.json(err.message);
            console.log(err.message);
        }
    })
});
itemtype_rout.put('/:id', (req:Request, res:Response)=>{
    let id:string = req.params['id'];
    let P:ITEMTYPE = req.body.itemtype_rout;
    connection.query(`UPDATE itemtype SET type_name=?,type_image=?`,
                    [P.type_name,P.type_image], 
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



export default itemtype_rout;

