const express = require('express')
const db_config = require('../config/database')
const oracledb = require('oracledb')
const path = require('path')
const router = express.Router()

// const connPromise = db_config.connect();

router.get('/', async (req, res) => {

    console.log('index Router');
    res.send(path.join(__dirname, 'react-project/build/index.html'))

})



module.exports = router