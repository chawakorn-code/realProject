//Starting API server
const express = require('express')
const apiroutes = require('./routes');
const mysql = require('mysql')
const db = require('./db/database');
const port = 3000
const app = express();

app.use(express.json());

app.use('/api/test',apiroutes);

//set route
const settingRoute = require('./routes/setting')
app.use(settingRoute)
const inventoryRoute = require('./routes/inventory')
app.use(inventoryRoute)

//start server
app.listen(process.env.PORT || port, () => {
    console.log('The API server is running on port:' + port)
})
