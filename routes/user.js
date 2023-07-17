const express = require('express')
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')

const router = express.Router()


// 회원가입
router.post('/join', (req, res) => {

    // sql문에 들어갈 패러미터
    let mem_clubno = 0
    let { mem_pw, mem_id, mem_nick, mem_region } = req.body.userData
    let dataList = [mem_id, mem_pw, mem_nick, mem_region, 0]

    // sql문 로직 작성
    let sql = 'insert into tb_member(mem_id,mem_pw,mem_nick,mem_region,mem_clubno) values (:mem_id,:mem_pw,:mem_nick,:mem_region,:mem_clubno)'


    // DB 연결 시도
    oracle(sql, dataList)
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

})
// 회원가입 끝

// 중복확인
router.get('/login/:mem_id', async (req, res) => {

    let dataList = [req.params.mem_id]

    let sql = 'select * from tb_member where mem_id = :mem_id'

    oracle(sql, dataList)
        .then((result) => {
            res.send(result)
        })
})
// 중복확인 끝

// 로그인
router.post('/login', async (req, res) => {

    // sql문에 들어갈 패러미터
    // let mem_id = 'test';
    // let mem_pw = '1234'
    let { mem_pw, mem_id } = req.body.userData
    let dataList = [mem_id, mem_pw]
    console.log(dataList);
    let sendData = { user: {}, score: {} }
    let acc = false

    console.log('login 시도');

    // sql문 로직 작성
    let sql = 'select * from tb_member where mem_id = :mem_id and mem_pw = :mem_pw'

    // DB 연결 시도
    oracle(sql, dataList)
        .then((result) => {
            sendData.user = result
            if(result.length > 0){
                acc = true
            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        });


    dataList = [mem_id, mem_id]

    sql = `SELECT g.game_seq,g.game_no,m.match_at,
                SUM(g.p01_score + g.p02_score + g.p03_score + g.p04_score + g.p05_score + g.p06_score + g.p07_score + g.p08_score + g.p09_score + g.p10_score + g.p11_score + g.p12_score) AS pScoreSum, 
                SUM(g.a01_score + g.a02_score + g.a03_score + g.a04_score + g.a05_score + g.a06_score + g.a07_score + g.a08_score + g.a09_score + g.a10_score + g.a11_score + g.a12_score) AS aScoreSum
            FROM tb_game g,
                (SELECT *
                FROM tb_match mt,
                    (SELECT PROPOSER_SEQ FROM tb_matcher WHERE mem_id = :mem_id) me,
                    (SELECT ACCEPTOR_SEQ FROM tb_acceptor WHERE mem_id = :mem_id) acc
                WHERE mt.PROPOSER_SEQ = me.PROPOSER_SEQ AND mt.ACCEPTOR_SEQ = acc.ACCEPTOR_SEQ) m
            WHERE g.match_seq = m.match_seq
            GROUP BY (g.game_seq,g.game_no),(m.match_at)
            order by g.game_seq`

    oracle(sql, dataList)
        .then((result) => {
            sendData.score = result;
            res.json({ result: acc, data: sendData })
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })


})
// 로그인 끝

// 회원 수정
router.put('/update', async (req, res) => {

    // sql문에 들어갈 패러미터
    let mem_pw = '1234'
    let mem_new_pw = '1111'
    let mem_id = 'test';
    // let {mem_pw, mem_id, mem_new_pw} = req.body
    dataList = [mem_new_pw, mem_id, mem_pw]

    // sql문 로직 작성
    let sql = 'update tb_member set mem_pw = :mem_new_pw where mem_id = :mem_id and mem_pw = :mem_pw'


    // DB 연결 시도
    oracle(sql, dataList)
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

})
// 회원 수정 끝

// 회원 탈퇴
router.delete('/delete', async (req, res) => {

    // sql문에 들어갈 패러미터
    let mem_pw = '1234'
    let mem_id = 'test';
    // let {mem_pw, mem_id} = req.body
    dataList = [mem_id, mem_pw]

    // sql문 로직 작성
    let sql = 'delete from tb_member where mem_id = :mem_id and mem_pw = :mem_pw'


    // DB 연결 시도
    oracle(sql, dataList)
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })



})
// 회원탈퇴 끝


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
                    if (result.rows.length > 0) {

                        // 로그인 성공시에만 연결이 해제됨
                        connRelase(conn)
                    }

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