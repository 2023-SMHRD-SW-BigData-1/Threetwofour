const express = require('express')
const router = express.Router()
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')

router.get('/', async (req, res) => {

    // sql문에 들어갈 패러미터
    let dataList = []
    let sendData = { todayGames: {}, games: {} }

    // sql문 로직 작성
    let sql = 'select * from tb_match'


    // DB 연결시도
    await oracle(sql, dataList)
        .then((result) => {
            sendData.games = result
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

    // 오늘 있을 모든 매칭
    sql = 'select * from tb_match where trunc(match_at) = trunc(sysdate) and match_at >sysdate'
    await oracle(sql, dataList)
        .then((result) => {
            sendData.todayGames = result
            res.send(sendData)
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

})

router.post('/user/match', async(req, res)=>{
    // console.log('matching Router!', req.body);

    let sql = 'insert into tb_match values(?,?,?,?,?,?,?)'
    conn.query(sql,
        [req.body.userdata.match_seq])
    
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