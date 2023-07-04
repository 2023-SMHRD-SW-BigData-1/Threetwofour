const socketIO = require('socket.io')

module.exports = (server, app) => {
    const io = socketIO(server, { path: '/socket.io' })


    app.set('io', io) // socket.js 외부에서 socketIO 사용할 수 있도록 값 저장
    //  /chat 요청 -> 채팅 (namespace)
    const chat = io.of('/chat') // namespace /chat -> 채팅


    // const alarm = io.of('/alarm') -> 실시간알람
    // alarm.on('connection')

    chat.on('connection', (socket) => {

        console.log('chat namespace에 접속');

        // socket.io // room // 방이 3개 1번방 -> (room 테이블의 roomid 컬럼값) 2번방 -> 2

        // 요청 경로에서 ROOM ID 값만 빼오기 -> 특정 ROOM에 들어갈 수 있도록 함
        const req = socket.request
        const {headers: {referer}} = req

        const roomID = referer.split('/')[referer.split('/').length -1];
        socket.join(roomID) // socket.io의 룸 중에 roomID가 지정되어 있는 ROOM 으로 들어가게 해줌

        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해제! ', socket.id);
            socket.leave(roomID)
        })

        socket.on('chat',(data)=>{ // data : 사용자가 입력한 채팅 내용
            console.log('data:',data);
            socket.to(data.roomid).emit(data)
        })
    })
}