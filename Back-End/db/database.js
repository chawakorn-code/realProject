const mysql = require('mysql')
const port = 8000
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rsquare2',
    port: port
})

connection.connect(function(err) {
    if(err){
        console.err('Error connection:'+err.stack)
    }
    console.log('connection as port :' + port)
})

let db = {};
db.all = () => {
    return new Promise((resolve,reject) => {
        connection.query(" SELECT * FROM user WHERE user_id ='60070503415' ",(err, results) => {
            if(err){
                return reject(err);
            }
            console.log(results)
            return resolve(results);
        })
    })
}
    // const Sequelize = require('sequelize')
    // const sequelize = new Sequelize('rsquare2','root','',{
        //     host: 'localhost',
    //     dialect: 'mysql',
    //     port: 8000,
    
    //     pool:{
    //         max: 5,
    //         min: 0,
    //         acquire: 30000,
    //         idle: 10000
    //     }
    // })
    
    // sequelize
    //     .authenticate()
    //     .then(() => {
    //         console.log('Connection complete!!')
    //     })
    //     .catch(err => {
    //         console.error('Unable to connect on the database')
    //     })
// db.sequelize = sequelize
// db.Sequelize = Sequelize

module.exports = db;