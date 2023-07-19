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

router.post('/insert', (req, res) => {
    console.log(req.body);

    
    // lane_seq 가져오는 방법
    `select lane.lane_seq
    from tb_lane lane
    inner join tb_bowling_alley bowling
    on lane.ba_sea = bowling.ba_seq
    where bowling.ba_name like '%:볼링장이름%'`
    
    // tb_proposer 회원 정보 가져오는 방법
    `select proposer_seq from tb_proposer where mem_id = :mem_id`
    
    // tb_proposer 회원이 없을 경우
    `insert into tb_proposer(mem_id) values(:mem_id);`
    
    // tb_acceptor 회원 정보 가져오는 방법
    `select acceptor_seq from tb_acceptor where mem_id = :mem_id`
    
    // tb_acceptor 회원이 없을 경우
    `insert into tb_acceptor(mem_id) values(:mem_id);`
    
    // tb_match에 데이터 입력하는 방법
    // '2023-07-18T00:41:29.977Z' 문자를 올바르게 Date 타입으로 넣기 위한 문장
    // to_date(to_char(to_timestamp_tz(:match_AT, 'YYYY-MM-DD"T"HH24:MI:SS.FFTZH:TZM'), 'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD HH24:MI:SS')
    `insert into tb_match(lane_seq, mem_part, proposer_seq, acceptor_seq, reg_at, match_at)
    values(:lane_seq, :mem_part,:proposer_seq,:acceptor_seq,sysdate,to_date(to_char(to_timestamp_tz(:match_AT, 'YYYY-MM-DD"T"HH24:MI:SS.FFTZH:TZM'), 'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD HH24:MI:SS'))`
    

    
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