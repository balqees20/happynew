import express from 'express';
import { Response } from 'express-serve-static-core'
import { Request } from 'express-serve-static-core';
import SitManger from '../model/sitManger';
import connection from '../dbconnection';
import { MysqlError } from 'mysql';
import bcrypt from "bcrypt";
import {generateAuthToken} from "../middlware/auth";

let mangerRoute = express.Router();

mangerRoute.post('/', async (req: express.Request, res:express.Response)=>{
    
    let mang: SitManger = req.body.sitManger;
    // get password hash code
    mang.password = await bcrypt.hash(mang.password, 10);
    connection.query("SELECT * FROM sitmanger WHERE mangerName=?", 
                        mang.mangerName, 
                        (err:MysqlError, result)=>{
                            if(err){
                                console.log(err.message);
                                res.json({"error":1});
                            }
                            else{
                                if(result.length>0){
                                    res.status(409).json({"success":false, "userexists":true})
                                }
                                else{
                                    connection.query(`INSERT INTO sitmanger (mangerName, password) 
                                VALUES('${mang.mangerName}', '${mang.password}')`,
                                (err:MysqlError, result)=>{
                                    if (err){
                                        console.log(err.message);
                                        res.json({'error': 1});
                                    }
                                    else{
                                        const token = generateAuthToken(mang);
                                        res.header("x-auth-token", token).send({
                                            _id: mang.sitManger_id,
                                            name: mang.mangerName,
                                            //email: user.role
                                        });
                                    }
                                })
                                            }
                            }
                        });

    
})
mangerRoute.get('/', (req: express.Request, res: express.Response)=>{
    connection.query("SELECT * FROM sitmanger", (err:MysqlError, result)=>{
        if(err){
            console.log(err.message);
            res.json({"error": 1});
        }
        else{
            res.json(result)
        }
    })
})

mangerRoute.post('/login', (req: express.Request, res: express.Response)=>{
    let mang: SitManger = req.body.sitManger;
    connection.query("SELECT * FROM sitmanger WHERE mangerName=? AND password=?",[mang.mangerName, mang.password],
                                (err:MysqlError, result)=>{
                                    if(err){
                                        console.log(err.message);
                                        res.json({"error":2});

                                    }
                                    else{
                                        if (result.length>0){
                                            const token = generateAuthToken(mang);
                                            res.header("x-auth-token", token).send({
                                                _id: mang.sitManger_id,
                                                name: mang.mangerName,
                                                //email: user.role
                                            });
                                        }
                                        else{
                                            res.json({"AccessDenid":true})
                                        }

                                    }
                                })
})

export default mangerRoute;