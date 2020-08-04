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
    database: 'inventory_management',
})
db.connect((err) => {
    if(err){
        throw(err)
    }
    console.log('mysql connected.')
})

//add transaction and approval
router.post('/transaction', (req,res) => {
    var id = req.body.id
    var No = req.body.No
    var type = req.body.type
    var inventoryID = req.body.inventoryID
    var userID = req.body.userID
    var amount = req.body.amount
    var location = req.body.location
    var detail = req.body.detail
    sql = "INSERT INTO `transaction` (`id`, `No`, `type`, `inventoryID`, `time`, `userID`, `amount`, `location`, `detail`) VALUES ('" + id + "', '" + No + "', '" + type + "', '" + inventoryID + "', CURRENT_TIMESTAMP, '" + userID + "', '" + amount + "', '" + location + "', '" + detail + "');"
    sql2 = "INSERT INTO `approval` (`id`, `transactionID`, `adminID`, `time`, `detail`, `status`) VALUES (NULL, '" + id + "', NULL, NULL, NULL, 'รอการอนุมัติ');"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
    db.query(sql2, (err, results) => {
        if(err){
            throw err
        }
    //res.send(results)
    })
})

//get all transaction
router.get('/transaction', (req,res) => {
    sql = "SELECT * FROM `transaction`;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//update transaction by id
router.patch('/transaction/:id', (req,res) => {
    var id = req.params.id
    var newid = req.body.id
    var No = req.body.No
    var type = req.body.type
    var inventoryID = req.body.inventoryID
    var userID = req.body.userID
    var amount = req.body.amount
    var location = req.body.location
    var detail = req.body.detail
    sql = "UPDATE `transaction` SET `id` = '" + newid + "', `No` = '" + No + "', `type` = '" + type + "', `inventoryID` = '" + inventoryID + "', `time` = 'CURRENT_TIMESTAMP', `userID` = '" + userID + "', `amount` = '" + amount + "', `location` = '" + location + "', `detail` = '" + detail + "' WHERE `transaction`.`id` = '" + id + "' "
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//delete transaction
router.delete('/transaction', (req,res) => {
    var id = req.body.id
    sqlf = "DELETE FROM `approval` WHERE `approval`.`transactionID` = " + id
    sql = "DELETE FROM `transaction` WHERE `transaction`.`id` = " + id
    db.query(sqlf, (err, results) => {
        if(err){
            throw err
        }
    //res.send(results)
    })
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//add addin transaction
router.post('/transaction/addin', (req,res) => {
    var id = req.body.id
    var No = req.body.No
    var inventoryID = req.body.inventoryID
    var amount = req.body.amount
    sql = "INSERT INTO `transaction` (`id`, `No`, `type`, `inventoryID`, `time`, `userID`, `amount`, `location`, `detail`) VALUES ('" + id + "', '" + No + "', 'ยอดยกมา', '" + inventoryID + "', CURRENT_TIMESTAMP, NULL, '" + amount + "', NULL, NULL);"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get log by date
router.get('/transaction/report', (req,res) => {
    var startDate = req.body.startDate
    var endDate = req.body.endDate
    sql = "SELECT * FROM `transaction` WHERE `time` BETWEEN '" + startDate + "' AND '" + endDate + "'"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get recent transaction by inventoryID
router.get('/transaction/recent/:id', (req,res) => {
    var id = req.params.id
    sql = "SELECT * FROM `transaction` WHERE inventoryID = " + id +" AND type LIKE 'ขอเบิก' ORDER BY time DESC LIMIT 1;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get transaction value
router.get('/transaction/value', (req,res) => {
    sql = "SELECT t.id, t.amount, i.price, t.amount*i.price AS value FROM `transaction` t LEFT JOIN inventory i ON t.inventoryID = i.id;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get all approval
router.get('/approval', (req,res) => {
    sql = "SELECT * FROM `approval`;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//update approval by id
router.patch('/approval/:id', (req,res) => {
    var id = req.params.id
    var newid = req.body.id
    var adminID = req.body.adminID
    var detail = req.body.detail
    var status = req.body.status
    sql = "UPDATE `approval` SET `id` = '" + newid + "', `adminID` = '" + adminID + "', `time` = 'CURRENT_TIMESTAMP', `detail` = '" + detail + "', `status` = '" + status + "' WHERE `approval`.`id` = '" + id + "' "
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

module.exports = router;