const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')

const router = express.Router();

// router.use(morgan('combined'))
router.use(bodyParser.json())
router.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 8000,
    database: 'inventory_management',
})

db.connect((err) => {
    if(err){
        throw(err)
    }
    console.log('mysql connected.')
})

router.get('/select/category',(req,res) => {
    sql = "SELECT category FROM `category` "
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

module.exports = router;