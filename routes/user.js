const express = require('express')
const db_config = require('../config/database')
const oracledb = require('oracledb')

const router = express.Router()

const connPromise = db_config.connect();

router.post('/join', async (req, res) => {
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


router.post('/login', async (req, res) => {
    const conn = await connPromise;

    let mem_id = 'ab';

    console.log(mem_id);

    let sql = 'select * from tb_member where mem_id = :mem_id'

    conn.execute(sql, [mem_id], (err, result) => {
        if (err) throw err;
        console.log(result);
        conn.release((err) => {
            if (err) throw err;
            console.log('연결해제');
        })
        res.send(result.rows)
    })



})




module.exports = router