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

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버연결 대기중...');
})

webSocket(server, app)