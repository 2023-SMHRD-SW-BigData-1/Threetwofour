const express = require('express')
const db_config = require('../config/database')
const oracledb = require('oracledb')

const router = express.Router()

const connPromise = db_config.connect();

router.get('/join', async (req, res) => {
    const conn = await connPromise;

    let sql = 'select * from tb_member'

    conn.execute(sql, [], (err, { rows }) => {
        if (err) {
            throw err
        };
        console.log(rows);
        conn.release((err) => {
            if (err) { throw err; }
            console.log('연결해제');
        })

    })

})





module.exports = router