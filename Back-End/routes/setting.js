const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
//const database = require('../db/database')

const router = express.Router();

router.use(morgan('combined'))
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

//add department
router.post('/department', (req,res) => {
    var No = req.body.No
    var name = req.body.name
    sql = "INSERT INTO `department` (`id`, `No`, `name`) VALUES (NULL, '"+ No +"', '" + name + "');"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//update department
router.patch('/department/:id', (req,res) => {
    var id = req.params.id
    var newid = req.body.id
    var No = req.body.No
    var name = req.body.name
    sql = "UPDATE `department` SET `id` = '" + newid + "', `No` = '" + No + "', `name` = '" + name + "' WHERE `department`.`id` = " + id + ";"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get all department
router.get('/department', (req,res) => {
    sql = "SELECT * FROM `department`;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//delete department
router.delete('/department', (req,res) => {
    var id = req.body.id
    sql = "DELETE FROM `department` WHERE `department`.`id` = " + id
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//add location
router.post('/location', (req,res) => {
    var No = req.body.No
    var name = req.body.name
    sql = "INSERT INTO `location` (`id`, `No`, `name`) VALUES (NULL, '"+ No +"', '" + name + "');"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get all location
router.get('/location', (req,res) => {
    sql = "SELECT * FROM `location`;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//delete location
router.delete('/location', (req,res) => {
    var id = req.body.id
    sql = "DELETE FROM `location` WHERE `location`.`id` = " + id
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

module.exports = router;