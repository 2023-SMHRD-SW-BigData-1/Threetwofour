const express = require('express')
const router = express.Router()
const path = require('path')
const db_config = require('../config/database')

const connPromise = db_config.connect()

router.get('/join', async (req,res)=>{
    console.log('join test');

    const conn = await connPromise;

    let sql = 'select * from tb_member'

    conn.execute(sql,(err,{rows})=>{
        if(err){throw err;}
        console.log(rows);
        res.json({data:rows})
        
    })
    conn.release((err)=>{
        if(err) console.log(err.message);
    })
})

module.exports = router