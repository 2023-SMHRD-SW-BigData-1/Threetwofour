const express = require('express')
const router = express.Router()
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')


router.get('/', async (req, res) => {

    let dataList = []

    let memberData = {
        memId: 'element.MEM_ID',
        memNick: 'element.MEM_NICK',
        memRegion: 'element.MEM_REGION',
        memJoindate: 'element.MEM_JOINDATE'
    }

    let bowlingAlleyData = {
        bowlingAlleySeq: 'element.BA_SEQ',
        bowlingAlleyName: 'element.BA_NAME',
        bowlingAlleyTel: 'element.BA_TEL',
        bowlingAlleyAddr: 'element.BA_ADDR',
        bowlingAlleyMachine: 'element.BA_MACHINE',
        bowlingAlleyMonitor: 'element.BA_MONITOR',
        bowlingAlleyLane: 'element.BA_LANE',
        bowlingAlleySet: 'element.BA_SET'
    }

    let clubData = {
        clubSeq: 'element.CLUB_SEQ',
        clubName: 'element.CLUB_NAME',
        clubInfo: 'element.CLUB_INFO',
        clubPhoto: 'element.CLUB_PHOTO',
        clubFoundationAt: 'element.CLUB_FOUNDATION_ATT',
        bowlingAlley: 'bowlingAlleyData',
        memberInfo: ['memberData']
    }

    let sendData = []

    let sql = `select * from tb_club`

    await oracle(sql, dataList)
        .then((result) => {
            result.forEach(element => {
                clubData = {
                    clubSeq: element.CLUB_SEQ,
                    clubName: element.CLUB_NAME,
                    clubInfo: element.CLUB_INFO,
                    clubPhoto: element.CLUB_PHOTO,
                    clubFoundationAt: element.CLUB_FOUNDATION_AT,
                    bowlingAlley: 'bowlingAlleyData',
                    memberInfo: []
                }
                sendData.push(clubData)
            });

        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

    sql = `select club.club_seq, club.club_name, club.club_info, club.club_photo, club.club_foundation_at,
                  club.join_seq, club.joined_at,
                  club.mem_id, club.mem_pw, club.mem_nick, club.mem_region, club.mem_joindate, club.mem_clubno, club.mem_type,
                  bowling.ba_seq, bowling.ba_name, bowling.ba_tel, bowling.ba_addr, bowling.ba_machine, bowling.ba_monitor, bowling.ba_lane, bowling.ba_lanetype, bowling.ba_set
            from tb_bowling_alley bowling
            inner join (select club.*, joining.join_seq, joining.joined_at, joining.mem_id, joining.mem_pw, joining.mem_nick, joining.mem_region, joining.mem_joindate, joining.mem_clubno, joining.mem_type
                        from tb_club club
                        inner join (select joining.join_seq, joining.club_seq, joining.joined_at, mem.*
                                    from tb_joining joining
                                    inner join tb_member mem
                                    on joining.mem_id = mem.mem_id) joining
                        on club.club_seq = joining.club_seq
                        order by club.club_seq) club
            on bowling.ba_seq = club.bowling_alley_seq`;

    await oracle(sql, dataList)
        .then((result) => {

            sendData.forEach(clubInfo => {
                result.forEach(element => {

                    memberData = {
                        memId: element.MEM_ID,
                        memNick: element.MEM_NICK,
                        memRegion: element.MEM_REGION,
                        memJoindate: element.MEM_JOINDATE
                    }

                    bowlingAlleyData = {
                        bowlingAlleySeq: element.BA_SEQ,
                        bowlingAlleyName: element.BA_NAME,
                        bowlingAlleyTel: element.BA_TEL,
                        bowlingAlleyAddr: element.BA_ADDR,
                        bowlingAlleyMachine: element.BA_MACHINE,
                        bowlingAlleyMonitor: element.BA_MONITOR,
                        bowlingAlleyLane: element.BA_LANE,
                        bowlingAlleySet: element.BA_SET
                    }


                    if (clubInfo.clubSeq == element.CLUB_SEQ) {

                        clubInfo.bowlingAlley = bowlingAlleyData
                        clubInfo.memberInfo.push(memberData)
                    }
                })
            })

        })
        .catch(() => {

        })

        res.send(sendData)

})

router.get('/more', async(req,res)=>{
    let dataList = []
    
    let sql = `select rownum, a.club_seq "num", a.club_name "team", a.club_info "contents", a.club_photo, a.foundation_at "date", a.ba_seq, a.ba_name "location"
               from (select club_seq, club_name, club_info, club_photo, to_char(trunc(club_foundation_at),'yyyy-mm-dd') foundation_at,
                     ba_seq, ba_name
                     from tb_club club
                     inner join tb_bowling_alley bowling
                     on club.BOWLING_ALLEY_SEQ = bowling.ba_seq
                     order by club_foundation_at) a
                where rownum < 4`

    oracle(sql,dataList)
    .then((result)=>{
        res.send(result)
    })
    .catch(()=>{

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