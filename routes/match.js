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

        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

    console.log(sendData.todayGames);
    res.send(sendData)
})

router.post('/insert', async (req, res) => {
    // console.log(req.body);
    const { mem_proposer, mem_acceptor, matchDate, match_At, mem_part, lane_seq, gameMode } = req.body.userData
    // console.log(
    //     mem_proposer, // 신청자
    //     mem_acceptor, // 수락자
    //     matchDate, // 매칭일자
    //     match_At, // 매칭일자
    //     mem_part, // 회원구분
    //     lane_seq, // 레인 번호
    //     gameMode // 게임모드
    // );

    console.log('matchDate', matchDate);
    console.log('match_At', match_At);


    let sql = ''
    let dataList = []

    let finalData = []

    // lane_seq 가져오는 방법
    dataList = [lane_seq]
    sql = `select ba_seq
            from tb_bowling_alley
            where ba_name like '%' || :lane_seq || '%'`
    await oracle(sql, dataList)
        .then((result) => {
            console.log('BA_SEQ',result);
            finalData = [
                ...finalData,
                result[0].BA_SEQ
            ]
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })


    finalData = [
        ...finalData,
        'm'
    ]

    // tb_proposer 회원 정보 가져오는 방법
    dataList = [mem_proposer.MEM_ID]
    sql = `select proposer_seq from tb_proposer where mem_id = :mem_id`

    await oracle(sql, dataList)
        .then(async (result) => {
            console.log(result);
            // tb_proposer 회원이 있을 경우
            if (result.length > 0) {
                finalData = [
                    ...finalData,
                    result[0].PROPOSER_SEQ
                ]
            }
            else {

                // tb_proposer 회원이 없을 경우
                dataList = [mem_proposer.MEM_ID]
                sql = `insert into tb_proposer(mem_id) values(:mem_id)`
                await oracle(sql, dataList)
                    .then(async (result) => {
                        if (result) {
                            dataList = [mem_proposer.MEM_ID]
                            sql = `select proposer_seq from tb_proposer where mem_id = :mem_id`
                            await oracle(sql, dataList)
                                .then((result) => {
                                    if (result.length > 0) {
                                        finalData = [
                                            ...finalData,
                                            result[0].PROPOSER_SEQ
                                        ]
                                    }
                                })
                                .catch((error) => {
                                    res.status(500).send(error.message)
                                })

                        }
                    })
                    .catch((error) => {
                        res.status(500).send(error.message)
                    })

            }
            console.log('완료');
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })


    // tb_acceptor 회원 정보 가져오는 방법
    dataList = [mem_proposer.MEM_ID]
    sql = `select acceptor_seq from tb_acceptor where mem_id = :mem_id`

    await oracle(sql, dataList)
        .then(async (result) => {
            console.log(result);
            // tb_proposer 회원이 있을 경우
            if (result.length > 0) {
                finalData = [
                    ...finalData,
                    result[0].ACCEPTOR_SEQ
                ]
            }
            else {

                // tb_acceptor 회원이 없을 경우
                dataList = [mem_proposer.MEM_ID]
                sql = `insert into tb_acceptor(mem_id) values(:mem_id)`
                await oracle(sql, dataList)
                    .then(async (result) => {
                        if (result) {
                            dataList = [mem_proposer.MEM_ID]
                            sql = `select tb_acceptor from tb_acceptor where mem_id = :mem_id`
                            await oracle(sql, dataList)
                                .then((result) => {
                                    if (result.length > 0) {
                                        finalData = [
                                            ...finalData,
                                            result[0].ACCEPTOR_SEQ
                                        ]
                                    }
                                })
                                .catch((error) => {
                                    res.status(500).send(error.message)
                                })

                        }
                    })
                    .catch((error) => {
                        res.status(500).send(error.message)
                    })

            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

    finalData = [
        ...finalData,
        match_At
    ]

    // tb_match에 데이터 입력하는 방법
    // '2023-07-18T00:41:29.977Z' 문자를 올바르게 Date 타입으로 넣기 위한 문장
    // to_date(to_char(to_timestamp_tz(:match_AT, 'YYYY-MM-DD"T"HH24:MI:SS.FFTZH:TZM'), 'YYYY-MM-DD HH24:MI:SS'), 'YYYY-MM-DD HH24:MI:SS')
    dataList = finalData
    sql = `insert into tb_match(ba_seq, mem_part, proposer_seq, acceptor_seq, reg_at, match_at)
    values(:lane_seq, :mem_part,:proposer_seq,:acceptor_seq,sysdate,to_date(:match_at,'yyyy-mm-dd hh24:mi:ss'))`

    console.log(finalData);
    await oracle(sql, dataList)
        .then((result) => {
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