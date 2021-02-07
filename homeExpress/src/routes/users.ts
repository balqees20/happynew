/* 
import express from 'express';
import User from '../model/users';
import connection from '../dbconnection';
import { MysqlError } from 'mysql';
import {generateAuthToken} from "../middlware/auth";

let users = express.Router();
//login route 
users.post('/',  (req: express.Request, res:express.Response)=>{
    let user: User = req.body.user;
    connection.query("SELECT * FROM users WHERE username=?", 
                        user.username, 
                     //call back :true or false
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
                                    connection.query(`INSERT INTO users 
                                    (username,email,phone_no,registration_type) 
                                    VALUES('${user.username}','${user.email}','${user.phone_no}','${user.registration_type}')`,
                                    (err:MysqlError, result)=>{
                                    if (err){
                                        console.log(err.message);
                                        res.json({'error': 1});
                                    }
                                    /*else{
                                        const token = generateAuthToken(user);
                                        res.header("x-auth-token", token).send({
                                            id: user.user_id,
                                            name: user.username
                                        });
                                    } 
                                })
                            }
            }
        });


})

users.get('/', (req: express.Request, res: express.Response)=>{
connection.query("SELECT * FROM users", (err:MysqlError, result)=>{
if(err){
console.log(err.message);
res.json({"error": 1});
}
else{
res.json(result)
}
})
});
users.get('/:user_id', (req, res) => {
let id = req.params['user_id'];
console.log("req.body.user: " + JSON.stringify(req.body.user));
connection.query("SELECT * FROM users where user_id=?",id, (err, results)=>{
res.json(results);
})
});*/

/* users.post('/login', (req: express.Request, res: express.Response)=>{
let user: User = req.body.user;
connection.query("SELECT * FROM users WHERE username=? AND password=?",[user.username, user.password],
                (err:MysqlError, result)=>{
                    if(err){
                        console.log(err.message);
                        res.json({"error":2});

                    }
                    else{
                        //is there users
                        if (result.length>0){
                            // if username and pass valied :create token 
                            const token = generateAuthToken(user);
                            res.header("x-auth-token", token).send({
                                id: user.user_id,
                                name: user.username
                            });
                        }
                        else{
                            res.json({"AccessDenid":true})
                        }

                    }
                })
});
users.post('/delete', (req, res) => {
let id: string = req.params['id'];
connection.query("DELETE FROM users WHERE id=?", id, (err: MysqlError, results)=>{
if (!err){
res.json({'deleted':id});
}
else{
res.json(err.message);
console.log(err.message);
}
})
});*/


