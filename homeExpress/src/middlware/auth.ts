import jwt from "jsonwebtoken";
import express from "express";
const config = require('config');
import SitManger from "../model/sitManger";

let auth = (req: express.Request, res: express.Response , next:Function) => {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");
    console.log("token: " + token);
    console.log("token[0]: " + token[0]);
    console.log("token[1]: " + token[1]);
    try {
      const decoded = jwt.verify(token.toString(), "abcd");
      req.body.sitManger = decoded;
      next();
    } catch (ex) {
    
      console.log(ex);
      res.status(400).send("Invalid token.");
    }
  };

export let generateAuthToken = (u:SitManger) => { 
    const token = jwt.sign({ sitManger_id: u.mangerName }, "abcd"); 
    
    return token;
}

export default auth;