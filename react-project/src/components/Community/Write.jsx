import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FileDropUpload from './components/FileDropUpload'

const Write = () => {

    const titleRef = useRef()
    const fileRef = useRef()
    const contentRef = useRef()

    const userInfo = JSON.parse(sessionStorage.getItem('user'))[0] 

    const [boardInfo, setBoardInfo] = useState({
        title: '',
        memId: userInfo.MEM_ID,
        content: '',
        fileName: ''
    })

    console.log();

    useEffect(() => {

        console.log(boardInfo);
    }, [boardInfo])

    // const [file, setFile] = useState<File>(null);

    const boardHandler = () => {
        setBoardInfo({
            title: titleRef.current.value,
            memId: userInfo.MEM_ID,
            content: contentRef.current.value,
            fileName: ''
        })
        // console.log('빈 파일', file);
        // setFile(fileRef.current.files[0])
        // console.log('이 파일은 : ', file);
    }

    const uploadBoard = () => {
        const boardAxios = async ()=>{
            const result = (await axios.post('http://localhost:8888/DB/community/input', boardInfo)).data
            console.log(result);
        }

        boardAxios()
    }


    return (


        <div className="board_wrap">
            <div className="board_title">
                <strong>게시판 이름</strong>
                <p>게시판 설명</p>
            </div>
            <div className="board_write_wrap">
                <div className="board_write">
                    <div className="title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" placeholder="제목 입력" ref={titleRef} onChange={boardHandler} /></dd>
                        </dl>
                    </div>
                    <div className="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd><input type="text" placeholder={userInfo.MEM_NICK} readOnly /></dd>
                        </dl>
                        <dl>
                            <dt>첨부파일</dt>
                            <dd><input type="file" placeholder="첨부파일 등록" accept='/image/*' /></dd>
                        </dl>
                    </div>
                    <div className="cont">
                        <textarea placeholder="내용 입력" onChange={boardHandler} ref={contentRef}></textarea>
                    </div>
                    <div className='info' style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: 'nowrap'
                    }}>
                        <dl style={{ width: 'auto' }}>
                            <dt>첨부파일</dt>
                        </dl>
                        <dl style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <dd style={{ width: '100%' }}><FileDropUpload /></dd>
                        </dl>
                    </div>
                </div>
                <div className="bt_wrap">

                    <button className='on' onClick={uploadBoard}>등록</button>
                    <Link to={'/community/'}>취소</Link>
                </div>
            </div>
        </div>
    )
}

export default Write