const express = require('express')
const router = express.Router()
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')


router.get('/bowling', async (req, res) => {

    let dataList = []

    let sql = 'select * from tb_bowling_alley'

    console.log('볼링장 데이터 가져오기');
    // DB 연결시도
    await oracle(sql, dataList)
        .then((result) => {

            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })


})




// DB 연결 함수
const oracle = (sql, dataList) => {

    return new Promise((resolve, reject) => {
        // DB 연결 시도
        oracledb.getConnection(db_config, (error, conn) => {

            // DB 연결 실패
            if (error) throw error;

            // sql문 실행
            conn.execute(sql, dataList, (err, result) => {

                // sql문 실행 실패
                if (err) throw err;

                if (Object.keys(result).includes('rows')) {

                    console.log('rows가 있음');

                    // 성공 후 로직

                    // 로그인 성공시에만 연결이 해제됨
                    connRelase(conn)

                    // 보낼 값

                    resolve(result.rows)
                }

                if (Object.keys(result).includes('rowsAffected')) {
                    console.log('rowsAffected가 있음');
                    // sql문 실행 실패
                    if (err) throw err;

                    // 성공 후 로직
                    if (result.rowsAffected > 0) {

                        // 탈퇴 성공시에만 연결이 해제됨
                        connRelase(conn)

                        // 보낼 값
                        resolve(true)
                    } else {

                        // 탈퇴 실패
                        resolve(false)
                    }
                }
            })
        })
    })

}


// DB 연결 해제 함수
const connRelase = (conn) => {
    conn.release((err) => {
        if (err) { throw err }

        console.log('DB 연결 해제');
    })
}

module.exports = router