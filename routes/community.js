const express = require('express')
const router = express.Router()
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')

router.get('/', async (req, res) => {
    let dataList = []

    let sql = `select *
               from tb_board board
               inner join tb_comment comm
               on board.bo_seq = comm.cm_num`

    await oracle(sql, dataList)
        .then((result) => {
            res.send(result)
        })
        .catch(() => {
            res.status(500).send(error.message)
        })
})

router.post('/input', async (req,res)=>{

    console.log(req.body);
    let dataList = []

    let sql = "insert into tb_board(bo_subject, mem_id, bo_content, bo_filename, bo_regdate, bo_modidate, bo_count) values(:title,:memId, :boContent,:boFilename, sysdate, sysdate, 0)"
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