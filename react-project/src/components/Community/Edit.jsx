import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    const nav = useNavigate()
    const { num } = useParams()

    const [boardInfo, setBoardInfo] = useState({})
    const [imgSrc, setImgSrc] = useState('')
    const [updateInfo, setUpdateInfo] = useState({})

    const titleRef = useRef()
    const writerRef = useRef()
    const dateRef = useRef()
    const contentRef = useRef()

    const viewAxios = async () => {
        const result = (await axios.get('http://localhost:8888/DB/community/view/' + num)).data
        setBoardInfo(result.boardInfo)

        if (result.boardInfo.imgSrc) {
            setImgSrc(result.boardInfo.imgSrc.split('public')[1])
        }
        console.log('페이지 불러옴');
        titleRef.current.value =boardInfo.title
        writerRef.current.value =boardInfo.writer
        contentRef.current.value =boardInfo.content
        dateRef.current.value =boardInfo.date
    }

    const handler = () =>{
        setUpdateInfo({
            content: contentRef.current.value
        })
    }

    useEffect(() => {
        viewAxios()
    }, [])

    return (

        <div className="board_wrap">
            <div className="board_title">
                <strong>자유게시판</strong>
                <p>궁금한 게 있으면 글 남겨주세요!</p>
            </div>
            <div className="board_write_wrap">
                <div className="board_write">
                    <div className="title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" placeholder="제목 입력" ref={titleRef} readOnly /></dd>
                        </dl>
                    </div>
                    <div className="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd><input type="text" placeholder="글쓴이 입력" ref={writerRef} readOnly /></dd>
                        </dl>
                        <dl>
                            <dt>작성날짜</dt>
                            <dd><input type="text" placeholder="비밀번호 입력" ref={dateRef} /></dd>
                        </dl>
                    </div>
                    <div className="cont">
                        <textarea placeholder="내용 입력" ref={contentRef} onChange={handler} />
                    </div>
                </div>
                <div className="bt_wrap">

                    <button className='on'>수정</button>
                    <button onClick={() => nav('/community/view/' + num, { state: { data:boardInfo } })}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default Edit