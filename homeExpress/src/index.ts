import express,{request,response} from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import multer from "multer";
import path from "path";
import auth from "./middlware/auth";
import cors from 'cors';
import active from "./routes/activity";
import camp_rout from "./routes/camp";
import course_route from "./routes/course";
import meet_rout from "./routes/meeting";
import news from "./routes/news";
import item_rout from "./routes/menuitem";
import program from "./routes/programs";
import {  } from "module";
import itemtype_rout from "./routes/itemtype";
import about_rout from "./routes/about";
import contact_rout from "./routes/contactv";
import mangerRoute from "./routes/sitManger";
import discount_rout from "./routes/discount"



//require('dotenv').config({
   // path: '.env'
//});

const config = require("config");
const app = express();
const port = 4620;
let corsOptions = { 
    origin: 'http://localhost:4620',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 
}

app.use(cors());


app.use(morgan("dev"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'../images')));
//app.use('/users',users);
app.use ('/activity',active);
app.use ('/camp',camp_rout);
app.use ('/course',course_route);
app.use ('/meeting',meet_rout);
app.use('/news', news);
app.use('/menuitems',item_rout);
app.use('/itemtype',itemtype_rout);
app.use('/program',program);
app.use('/about',about_rout);
app.use('/contact',contact_rout);
app.use('/sitManger',mangerRoute)
app.use('/discount',discount_rout)




    app.get('/', (req, res) => {
        res.send("Hello World! Express is running ");
    });
    

app.listen(port, () =>{
    console.log("Server listening on port " + port)
});
