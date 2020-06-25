const mysql = require('mysql')
const port = 80;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_management',
    port: port
})

// if(error) throw error;
//     connection.connect(function(error){
//     console.log('Database connected on port: ' + port)
// })

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