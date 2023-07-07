const express = require('express')
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')

const router = express.Router()


// 회원가입
router.post('/join', (req, res) => {

    // sql문에 들어갈 패러미터
    let mem_clubno = 0
    let { mem_pw, mem_id, mem_nick, mem_region } = req.body.userData
    let dataList = [mem_pw, mem_id, mem_nick, mem_region]

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

// 로그인
router.post('/login', async (req, res) => {

    // sql문에 들어갈 패러미터
    // let mem_id = 'test';
    // let mem_pw = '1234'
    let { mem_pw, mem_id } = req.body.userData
    let dataList = [mem_id, mem_pw]

    console.log('login 시도');

    // sql문 로직 작성
    let sql = 'select * from tb_member where mem_id = :mem_id and mem_pw = :mem_pw'


    // DB 연결 시도
    oracle(sql, dataList)
        .then((result) => {
            res.send(result)
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

                        // 보낼 값
                        resolve(true)
                    } else {

                        // 로그인 실패
                        resolve(false)
                    }
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