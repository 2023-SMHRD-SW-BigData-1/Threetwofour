const express = require('express')
const router = express.Router()
const oracledb = require('oracledb')
const dbConfig = require('../config/database')
const connPromise = dbConfig.connect()

router.get('/', async (req, res) => {
    const conn = await connPromise;

    let sql = 'select * from tb_match'

    conn.execute(sql, [], (err, result) => {
        if (err) throw err;

        conn.release((err) => {
            if (err) throw err;
        })
        res.send(result)
    })

})



module.exports = router