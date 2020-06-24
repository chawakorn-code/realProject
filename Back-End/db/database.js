const mysql = require('mysql')
const port = 8000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rsquare2',
    port: port
})

connection.connect(function(error){
    if(error) throw error;
    console.log('Connected at port: ' + port)
})

let db = {};
db.all = () => {
    return new Promise((resolve,reject) => {
        connection.query(" SELECT * FROM user WHERE user_id ='60070503415' ",(err, results) => {
            if(err){
                return reject(err);
            }
                return resolve(results);
        })
    })
}
module.exports = db;