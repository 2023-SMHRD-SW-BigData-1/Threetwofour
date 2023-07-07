const express = require('express')
const router = express.Router()
const oracledb = require('oracledb')
const db_config = require('../config/dbconfig')

router.get('/', async (req, res) => {

    // sql문에 들어갈 패러미터

    // sql문 로직 작성
    let sql = 'select * from tb_match'

    // DB 연결시도
    oracledb.getConnection(db_config, (err, conn) => {

        // DB 연결 실패
        if (err) throw err;

        // sql문 실행
        conn.execute(sql, [], (err2, result) => {

            // sql문 실행 실패
            if (err2) throw err2;

            // 성공 후 로직

            // DB 연결 해제
            conn.release((err3) => {

                // DB 연결 해제 실패
                if (err3) throw err3;

                console.log('DB 연결해제');

            })

        })

    })

})



module.exports = router