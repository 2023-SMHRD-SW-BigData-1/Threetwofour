const express = require('express')
const db_config = require('../config/database')
const oracledb = require('oracledb')

const router = express.Router()

const connPromise = db_config.connect();

// 회원가입
router.post('/join', async (req, res) => {
    const conn = await connPromise;

    let mem_id = 'test'
    let mem_pw = '1234'
    let mem_nick = 'nick'
    let mem_region = 'region'
    let mem_clubno = 0
    // let {mem_pw, mem_id, mem_nick, mem_region, mem_clubno} = req.body


    let sql = 'insert into tb_member(mem_id,mem_pw,mem_nick,mem_region,mem_clubno) values (:mem_id,:mem_pw,:mem_nick,:mem_region,:mem_clubno)'

    conn.execute(sql, [mem_id, mem_pw, mem_nick, mem_region, mem_clubno], (err, result) => {
        if (err) {
            throw err
        };
        console.log(result);
        conn.release((err) => {
            if (err) { throw err; }
            console.log('연결해제');
        })
        res.send(result)

    })

})

// 로그인
router.post('/login', async (req, res) => {
    const conn = await connPromise;

    let mem_id = 'test';
    let mem_pw = '1234'
    // let {mem_pw, mem_id} = req.body
    

    let sql = 'select * from tb_member where mem_id = :mem_id and mem_pw = :mem_pw'

    conn.execute(sql, [mem_id,mem_pw], (err, result) => {
        if (err) throw err;
        console.log(result);
        
        conn.release((err) => {
            if (err) throw err;
            console.log('연결해제');
        })

        if(result.rows.length>0){
            res.send(result.rows)
        }else{
            res.send('로그인실패')
        }
    })

})

// 회원정보 수정
router.put('/update', async (req, res) => {
    const conn = await connPromise;

    let mem_pw = '1111'
    let mem_new_pw = '1234'
    let mem_id = 'test';
    // let {mem_pw, mem_id, mem_new_pw} = req.body


    console.log(mem_id);

    let sql = 'update tb_member set mem_pw = :mem_new_pw where mem_id = :mem_id and mem_pw = :mem_pw'

    conn.execute(sql, [mem_new_pw, mem_id, mem_pw], (err, result) => {
        if (err) throw err;
        console.log(result);
        conn.release((err) => {
            if (err) throw err;
            console.log('연결해제');
        })
        console.log(result.rowsAffected);
        res.send(result)
    })
})

// 회원 탈퇴
router.delete('/delete', async (req, res) => {
    const conn = await connPromise;

    let mem_pw = '1234'
    let mem_id = 'test';
    // let {mem_pw, mem_id} = req.body

    console.log(mem_id);

    let sql = 'delete from tb_member where mem_id = :mem_id and mem_pw = :mem_id'

    conn.execute(sql, [mem_id, mem_pw], (err, result) => {
        if (err) throw err;
        console.log(result);
        conn.release((err) => {
            if (err) throw err;
            console.log('연결해제');
        })
        console.log(result.rowsAffected);
        res.send(result)
    })
})


module.exports = router