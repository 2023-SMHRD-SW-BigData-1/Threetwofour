const oracledb = require('oracledb')
const db_info = require('./dbconfig')

module.exports = {
    init: function () {
        console.log('데이터베이스 초기화 완료');
        oracledb.initOracleClient({ libDir: __dirname+'./oracle_client' })
    }


}