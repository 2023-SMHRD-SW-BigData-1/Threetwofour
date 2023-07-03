const express = require('express')
const router = express.Router()
const path = require('path')
const db_config = require('../config/database')

const connPromise = db_config.connect()

router.get('/', async (req,res)=>{
    console.log('test');

    const conn = await connPromise;

    let sql = 'select * from tb_member'

    conn.execute(sql,(err,{rows})=>{
        if(err){throw err;}
        console.log(rows);
        res.render(path.join(__dirname,'react-project/build/index.html'),{rows:rows})
    })

    
})

module.exports = router