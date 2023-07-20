const express = require('express')
const router = express.Router()
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')

router.post('/insert', async(req,res)=>{
    console.log(req.body);

    const {lane, ballShoes, facility, service, comment, memId, baSeq} = req.body


    let dataList = [lane, ballShoes, facility, service, comment, memId, baSeq]
    let sql = `insert into tb_ratings(rt_lane, rt_ballshoes, rt_facility, rt_service, rt_usercomment, mem_id, ba_seq)
    values(:rt_lane, :rt_ballshoes, :rt_facility, :rt_service, :rt_usercomment, :mem_id, :ba_seq)`

    await oracle(sql, dataList)
    .then((result)=>{
        res.send(result)
    })
    .catch((error) => {
        res.status(500).send(error.message)
    })

})


// DB 연결 함수
const oracle = (sql, dataList) => {

    // sql = 'insert into tb_match(match_seq, lane_seq, mem_part, proposer_seq, acceptor_seq, matchDate, match_At) values(:match_seq,:lane_seq, :mem_part, :proposer_seq, :acceptor_seq, :matchDate, :match_At)'
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
                    console.log('--------------------------');


                    // 성공 후 로직

                    // 로그인 성공시에만 연결이 해제됨
                    connRelase(conn)

                    // 보낼 값

                    resolve(result.rows)
                    console.log('보내졌어여');
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
console.log('--------------------------');

// DB 연결 해제 함수
const connRelase = (conn) => {
    conn.release((err) => {
        if (err) { throw err }

        console.log('DB 연결 해제');
    })
}



module.exports = router