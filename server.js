const express = require('express')
const app = express()
const indexRouter = require('./routes')
const database = require('./config/database')
const oracledb = require('./node_modules/oracledb')
const userRouter = require('./routes/user')
const path = require('path')
const cors = require('cors')
const webSocket = require('./socket')
const matchRouter = require('./routes/match')
const bowlingAlleyRouter = require('./routes/bowlinAlley')
const clubRouter = require('./routes/club')
const communityRouter = require('./routes/community')
const ratingRouter = require('./routes/rating')


app.set('port', process.env.PORT || 8888)
// DB 연결 설정
database.init() // DB 설정 초기화
oracledb.autoCommit = true; // 자동 커밋
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'react-project/build')))

const urlText = '/DB';

app.use('/', indexRouter)
app.use((urlText+'/user'), userRouter)
app.use((urlText+'/match'),matchRouter)
app.use((urlText+'/bowlingAlley'),bowlingAlleyRouter)
app.use((urlText+'/club'),clubRouter)
app.use(urlText+'/community', communityRouter)
app.use(urlText+'/rating', ratingRouter)

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버연결 대기중...');
})

// const express = require('express');
// const app = express();
// const cors =require('cors')
// const PORT = 8888;
// const database = require('./config/database')
// const oracledb = require('oracledb');
const db_info = require('./config/dbconfig');

app.use(cors())
app.use(express.json()); // JSON 요청을 파싱하기 위한 미들웨어 설정

database.init()
oracledb.autoCommit= true

// 라우트 및 요청 핸들러 추가
app.post('/api/ratings', (req, res) => {
    // const ratings = req.body.ratings;
    // const comment = req.body.comment;
  
    // 데이터 처리 또는 저장 로직 구현
    // ...

    const {ratings,lane,ballShoes,facility,service,comment} = req.body

    
    // console.log('lane:',lane);
    // console.log('ball:',ballShoes);
    // console.log('rest:',facility);
    // console.log('ser:',service);
    // console.log('comm:',comment);

    // console.log((lane.value + ballShoes.value + facility.value + service.value)/(Object.keys(req.body).length-2));

    let mem_id = "bowling001@test.com"
    // let mem_pw = 'qwer1234!'
    let LANE_SEQ = 1
    // `INSERT INTO TB_RATINGS(MEM_ID,LANE_SEQ, LANE, BALLSHOES, FACILITY, SERVICE, USERCOMMENT)
    // VALUSE (:mem_id, :LANE_SEQ, :LANE, :BALLSHOES, :FACILITY, :SERVICE, :USERCOMMENT)`
    // select * from tb_member where mem_id = :mem_id and mem_pw = :mem_pw
    let sql = `INSERT INTO TB_RATINGS(MEM_ID,LANE_SEQ, LANE, BALLSHOES, FACILITY, SERVICE, USERCOMMENT)
    VALUES (:mem_id, :LANE_SEQ, :LANE, :BALLSHOES, :FACILITY, :SERVICE, :USERCOMMENT)`

    console.log(mem_id,LANE_SEQ,lane.value,ballShoes.value,facility.value,service.value,comment)


    oracledb.getConnection(db_info,(err,conn)=>{
      console.log('db접속 시도');

      if(err) throw err;



      conn.execute(sql,[mem_id,LANE_SEQ,lane.value,ballShoes.value,facility.value,service.value,comment],(err, result)=>{

        if(err) throw err;
        console.log(result.rowsAffected);

        conn.release((err)=>{
          console.log('연결 끊김');
          if(err) throw err;
        })

      })
    })


    // console.log(lane.value + ballShoes.value);
  
    // 응답 전송
    res.json({ message: '평가가 제출되었습니다.' });
  });

webSocket(server, app)