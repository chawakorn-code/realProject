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
    var id = req.body.id
    var No = req.body.No
    var name = req.body.name
    sql = "INSERT INTO `department` (`id`, `No`, `name`) VALUES ('" + id + "', '"+ No +"', '" + name + "');"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//update department by id
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
    var id = req.body.id
    var No = req.body.No
    var name = req.body.name
    sql = "INSERT INTO `location` (`id`, `No`, `name`) VALUES ('" + id + "', '"+ No +"', '" + name + "');"
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

//update location by id
router.patch('/location/:id', (req,res) => {
    var id = req.params.id
    var newid = req.body.id
    var No = req.body.No
    var name = req.body.name
    sql = "UPDATE `location` SET `id` = '" + newid + "', `No` = '" + No + "', `name` = '" + name + "' WHERE `location`.`id` = " + id + ";"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//add user
router.post('/user', (req,res) => {
    var id = req.body.id
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var email = req.body.email
    var role = req.body.role
    var departmentID = req.body.departmentID
    var status = req.body.status
    sql = "INSERT INTO `user` (`id`, `username`, `password`, `name`, `email`, `role`, `departmentID`, `status`) VALUES ('" + id + "', '" + username + "', '" + password + "', '" + name + "', '" + email + "', '" + role + "', '" + departmentID + "', '" + status + "');"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//get all user
router.get('/user', (req,res) => {
    sql = "SELECT * FROM `user`;"
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//delete user
router.delete('/user', (req,res) => {
    var id = req.body.id
    sql = "DELETE FROM `user` WHERE `user`.`id` = " + id
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

//update user by id
router.patch('/user/:id', (req,res) => {
    var newid = req.body.id
    var id = req.body.id
    var username = req.body.username
    var password = req.body.password
    var name = req.body.name
    var email = req.body.email
    var role = req.body.role
    var departmentID = req.body.departmentID
    var status = req.body.status
    sql = "UPDATE `user` SET `id` = '" + newid + "', `username` = '" + username + "', `password` = '" + password + "', `name` = '" + name + "', `email` = '" + email + "', `role` = '" + role + "', `departmentID` = '" + departmentID + "', `status` = '" + status + "' WHERE `user`.`id` = " + id + " "
    db.query(sql, (err, results) => {
        if(err){
            throw err
        }
    res.send(results)
    })
})

module.exports = router;