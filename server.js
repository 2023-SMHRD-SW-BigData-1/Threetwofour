const express = require('express')
const app = express()
const indexRouter = require('./routes')
const db_config = require('./config/database')
const oracledb = require('./node_modules/oracledb')
const userRouter = require('./routes/user')
const path = require('path')
const cors = require('cors')
const webSocket = require('./socket')


app.set('port', process.env.PORT || 8888)
db_config.init()
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'react-project/build')))

app.use('/', indexRouter)
app.use('/user', userRouter)

const server = app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버연결 대기중...');
})

webSocket(server, app)