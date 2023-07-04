const oracledb = require('oracledb')
const db_info = require('./dbconfig')

module.exports = {
    init: function () {
        console.log('데이터베이스 초기화 완료');
        oracledb.initOracleClient({ libDir: __dirname+'./oracle_client' })
    },
    connect: function () {
        return new Promise((resolve, reject) => {
            oracledb.getConnection(db_info, (err, conn) => {
                if (err) {
                    console.error('Connection failed:', err.message);
                    reject(err); // Reject the promise with the error
                } else {
                    console.log('Connection successful');
                    resolve(conn); // Resolve the promise with the connection object
                }
            });
        });
    }


}