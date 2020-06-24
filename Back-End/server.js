//Starting API server
const express = require('express')
const apiroutes = require('./routes')
const port = 3000
const app = express();

app.use(express.json());

app.use('/',apiroutes);

 app.listen(process.env.PORT || port, () => {
    console.log('Server is running on port:' + port)
})  
