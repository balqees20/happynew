import mysql from "mysql";


const connection: mysql.Connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'happyhome',
})

export default connection;
