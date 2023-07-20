const express = require('express')
const router = express.Router()
const db_config = require('../config/dbconfig')
const oracledb = require('oracledb')
var multer = require('multer');
const path = require('path');
const { send } = require('process');

// 게시물 불러오기
router.get('/', async (req, res) => {
    let dataList = []

    let sql = `select board.bo_seq "num",
                      board.bo_subject "title",
                      member.mem_nick "writer",
                      board.bo_content "content",
                      board.bo_filename "imgSrc",
                      to_char(trunc(board.bo_regdate),'yyyy.mm.dd') "date",
                      to_char(trunc(board.bo_modidate),'yyyy.mm.dd') "modiDate",
                      board.bo_count "count"
               from tb_board board
               inner join tb_member member
               on board.mem_id = member.mem_id
               order by board.bo_seq desc`

    await oracle(sql, dataList)
        .then((result) => {
            res.send(result)
        })
        .catch(() => {
            res.status(500).send(error.message)
        })
})
// 게시물 불러오기 끝

// 게시물 자세한 설명
router.get('/view/:num', async (req, res) => {
    console.log('view로 들어옴');

    // 어떤 게시물인지 가져오기
    const { num } = req.params;
    // 실제로 보낼 정보
    let sendData = {};

    // 게시물 정보 가져오기
    let sql = `select board.bo_seq "num",
                      board.bo_subject "title",
                      member.mem_nick "writer",
                      board.bo_content "content",
                      board.bo_filename "imgSrc",
                      to_char(trunc(board.bo_regdate),'yyyy.mm.dd') "date",
                      to_char(trunc(board.bo_modidate),'yyyy.mm.dd') "modiDate",
                      board.bo_count "count"
               from tb_board board
               inner join tb_member member
               on board.mem_id = member.mem_id
               where board.bo_seq = :num`

    let dataList = [num]
    await oracle(sql, dataList)
        .then((result) => {
            // console.log(result);
            sendData = {
                ...sendData,
                boardInfo: result[0]
            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

    // 댓글 정보 가져오기
    sql = `select cm_seq "cmNum",
                  mem_nick "cmNick",
                  cm_content "cmContent",
                  to_char(trunc(reg_date),'yyyy.mm.dd') "cmDate",
                  cm_seq_fk "reCmNum",
                  bo_seq "num"
           from tb_comment comm
           inner join tb_member member
           on comm.mem_id = member.mem_id
           where bo_seq = :num`
    dataList = [num]
    await oracle(sql, dataList)
        .then((result) => {
            sendData = {
                ...sendData,
                commentInfo: result
            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

    res.send(sendData)
})
// 게시물 자세한 설명

// 파일 저장 위치 및 파일명 설정
const upload = multer({
    storage: multer.diskStorage({
        filename(req, file, done) {
            // console.log('filename',file);
            done(null, Date.now() + path.extname(file.originalname))
        },
        destination(req, file, done) {
            // console.log('destination',file);
            done(null, path.join(__dirname, '../react-project/public/uploadsImg'))
        }
    })
})
// 파일 잡아주기 위한 미들웨어
const uploadMiddleware = upload.single('file')


// 게시판 등록
router.post('/input', uploadMiddleware, async (req, res) => {

    // upload(req, res, function (err) {
    //     if (err) {
    //         return res.end("Error uploading file.");
    //     }
    //     res.end("File is uploaded");
    // });

    const file = req.file || '';
    // console.log('file', file); // 파일 정보 출력
    // console.log(req.body);
    // console.log('filePath',file.path ? String(file.path).replaceAll('\\', '/'): '');
    const filePath = file.path ? String(file.path).replaceAll('\\', '/') : ''
    const { title, memId, content } = req.body
    let dataList = [title, memId, content, filePath]

    // console.log('dataList',dataList);

    let sql = "insert into tb_board(bo_subject, mem_id, bo_content, bo_filename, bo_regdate, bo_modidate, bo_count) values(:title,:memId, :boContent,:boFilename, sysdate, sysdate, 0)"

    oracle(sql, dataList)
        .then((result) => {
            console.log(result);
            res.send(result)
        })
        .catch(() => {
            res.status(500).send(error.message)
        })
})
// 게시판 등록 끝

// 게시판 조회수 
router.put('/count/:num', async (req, res) => {
    const { num } = req.params
    console.log(num);

    let dataList = [num]
    let count = '';

    let sql = 'select bo_count "count" from tb_board where bo_seq = :num'

    await oracle(sql, dataList)
        .then((result) => {
            count = parseInt(result[0].count)
            
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

    count += 1;
    dataList = [count, num]
    console.log(dataList);
    sql = 'update tb_board set bo_count = :count where bo_seq = :num'
    await oracle(sql, dataList)
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })

})
// 게시판 조회수 끝

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