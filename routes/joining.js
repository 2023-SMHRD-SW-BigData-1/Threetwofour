const express = require('express')
const router = express.Router()
const db_config = require('../config/database')

const connPromise = db_config.connect()

router.get('/',async(req,res)=>{
    const conn = await connPromise

    let sql = 'select * from tb_joining'

    conn.execute(sql,[],(err,result)=>{
        if(err) throw err;
        console.log('클럽 가입 정보 가져오기');
        res.send(result)
    })

})

module.exports = router