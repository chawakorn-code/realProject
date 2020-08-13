const express = require('express')
const bodyParser = require('body-parser') //For get user input
const cors = require('cors')
const morgan = require('morgan')
// const database = require('../db/database') // import database file that already config

const router = express.Router();

router.use(morgan('process...'))
router.use(bodyParser.json())
router.use(cors())

router.get('/', async (req,res,next) => {
  try{
    let results = await database.all();
    res.json(results);
  } catch(e) {
      console.log(e);
      res.sendStatus(500);
  }
})

module.exports = router;