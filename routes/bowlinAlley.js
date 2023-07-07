const express = require('express')
const router = express.Router()
const db_config = require('../config/dbconfig')


router.get('/', async (req, res) => {

    let sql = 'select * from tb_bowling_alley'

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