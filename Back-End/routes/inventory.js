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

//add inventory
router.post('/inventory', (req,res) => {
    var id = req.body.id
    var name = req.body.name
    var pic = req.body.pic
    var categoryID = req.body.categoryID
    var unit = req.body.unit
    var price = req.body.price
    var min = req.body.min
    var max = req.body.max
    var amount = req.body.amount
    var locationID = req.body.locationID
    var status = req.body.status
    sql = "INSERT INTO `inventory` (`id`, `name`, `pic`, `categoryID`, `unit`, `price`, `min`, `max`, `amount`, `locationID`, `status`) VALUES ('" + id + "', '" + name + "', '" + pic + "', '" + categoryID + "', '" + unit + "', '" + price + "', '" + min + "', '" + max + "', '" + amount + "', '" + locationID + "', '" + status + "');"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get all inventory
router.get('/inventory', (req,res) => {
    sql = "SELECT * FROM `inventory`;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//update inventory by id
router.patch('/inventory/:id', (req,res) => {
    var id = req.params.id
    var newid = req.body.id
    var name = req.body.name
    var pic = req.body.pic
    var categoryID = req.body.categoryID
    var unit = req.body.unit
    var price = req.body.price
    var min = req.body.min
    var max = req.body.max
    var amount = req.body.amount
    var locationID = req.body.locationID
    var status = req.body.status
    sql = "UPDATE `inventory` SET `id` = '" + newid + "', `name` = '" + name + "', `pic` = '" + pic + "', `categoryID` = '" + categoryID + "', `unit` = '" + unit + "', `price` = '" + price + "', `min` = '" + min + "', `max` = '" + max + "', `amount` = '" + amount + "', `locationID` = '" + locationID + "', `status` = '" + status + "' WHERE `inventory`.`id` = " + id + ";"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//delete inventory
router.delete('/inventory', (req,res) => {
    var id = req.body.id
    sql = "DELETE FROM `inventory` WHERE `inventory`.`id` = " + id
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//filter inventory by category
router.get('/inventory/bycategory', (req,res) => {
    var category = req.body.category
    sql = "SELECT * FROM `inventory` WHERE `categoryID` = (SELECT category.id FROM `category` WHERE category.category = '" + category + "');"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get inventory by id
router.get('/inventory/:id', (req,res) => {
    var id = req.params.id
    sql = "SELECT * FROM `inventory` WHERE `id` = '" + id + "';"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get inventory.id from name
router.get('/inventory/getid/:name', (req,res) => {
    var name = req.params.name
    sql = "SELECT `id` FROM `inventory` WHERE `name` = '" + name + "'"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//update inventory amount by id
router.patch('/inventory/amount', (req,res) => {
    var id = req.body.id
    var amount = req.body.amount
    sql = "UPDATE `inventory` SET `amount` = `amount` +  "+ amount +"  WHERE `id` =  "+ id +" ;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get inventory where amount > max
router.get('/inventory/highstock', (req,res) => {
    sql = "SELECT * FROM `inventory` WHERE `amount` > `max`"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get inventory where amount < min
router.get('/inventory/lowstock', (req,res) => {
    sql = "SELECT * FROM `inventory` WHERE `amount` < `min`"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get inventory where amount = 0
router.get('/inventory/outstock', (req,res) => {
    sql = "SELECT * FROM `inventory` WHERE `amount` = 0"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get recent addin by id
router.get('/inventory/:id/addin', (req,res) => {
    var id = req.params.id
    sql = "SELECT `amount` FROM `transaction` WHERE `inventoryID` = "+ id +" AND `type` = 'ยอดยกมา' ORDER BY time DESC LIMIT 1 "
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

module.exports = router;