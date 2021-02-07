"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const activity_1 = __importDefault(require("./routes/activity"));
const camp_1 = __importDefault(require("./routes/camp"));
const course_1 = __importDefault(require("./routes/course"));
const meeting_1 = __importDefault(require("./routes/meeting"));
const news_1 = __importDefault(require("./routes/news"));
const menuitem_1 = __importDefault(require("./routes/menuitem"));
const programs_1 = __importDefault(require("./routes/programs"));
const itemtype_1 = __importDefault(require("./routes/itemtype"));
const about_1 = __importDefault(require("./routes/about"));
const contactv_1 = __importDefault(require("./routes/contactv"));
const sitManger_1 = __importDefault(require("./routes/sitManger"));
//require('dotenv').config({
// path: '.env'
//});
const config = require("config");
const app = express_1.default();
const port = 4620;
let corsOptions = {
    origin: 'http://localhost:4620',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
};
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../images')));
//app.use('/users',users);
app.use('/activity', activity_1.default);
app.use('/camp', camp_1.default);
app.use('/course', course_1.default);
app.use('/meeting', meeting_1.default);
app.use('/news', news_1.default);
app.use('/menuitems', menuitem_1.default);
app.use('/itemtype', itemtype_1.default);
app.use('/program', programs_1.default);
app.use('/about', about_1.default);
app.use('/contact', contactv_1.default);
app.use('/sitManger', sitManger_1.default);
const storage = multer_1.default.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images');
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`);
    }
});
let upload = multer_1.default({ storage: storage });
app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
        const error = new Error('No File');
        return next(400);
    }
    res.send(file);
});
app.get('/', (req, res) => {
    res.send("Hello World! Express is running ");
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
//# sourceMappingURL=index.js.map