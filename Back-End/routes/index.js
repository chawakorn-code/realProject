const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const database = require('../db/database')

const router = express.Router();

router.use(morgan('process...'))
router.use(bodyParser.json())
router.use(cors())

module.exports = router;