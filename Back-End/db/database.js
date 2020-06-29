const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_management',
})

let db = {};
db.connect = () => {
    connection.connect((err) => {
        if(err){
            throw(err)
        }
        console.log('mysql connected.')
    })
}

module.exports = db;