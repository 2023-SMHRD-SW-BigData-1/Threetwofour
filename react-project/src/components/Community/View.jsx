import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const View = () => {
    const { num } = useParams()
    const location = useLocation()
    const borderInfo = location.state.data;
    const [boardInfo, setBoardInfo] = useState({})
    const [commentInfo, setCommentInfo] = useState([])
    const [imgSrc, setImgSrc] = useState('')
    const nav = useNavigate()

    const viewAxios = async () =>{
        const result = (await axios.get('http://localhost:8888/DB/community/view/'+num)).data
        setBoardInfo(result.boardInfo)
        setCommentInfo(result.commentInfo)

        if(result.boardInfo.imgSrc){
            setImgSrc(result.boardInfo.imgSrc.split('public')[1])
        }
        console.log('페이지 불러옴');
    }

    const countAxios = async () =>{
        const result = (await axios.put('http://localhost:8888/DB/community/count/'+num)).data
        console.log('result',result);
            await viewAxios()
    }

    useEffect(()=>{
        countAxios()
    },[])
    return (
        
        <div className="board_wrap">
            <div className="board_title">
                <strong>자유게시판</strong>
                <p>궁금한 게 있으면 글 남겨주세요!</p>
            </div>
            <div className="board_view_wrap">
                <div className="board_view">
                    <div className="title">
                        {/* 글 제목 */}
                        {boardInfo.title}
                    </div>
                    <div className="info">
                        <dl>
                            <dt>번호</dt>
                            <dd>{boardInfo.num}</dd>
                        </dl>
                        <dl>
                            <dt>글쓴이</dt>
                            <dd>{boardInfo.writer}</dd>
                        </dl>
                        <dl>
                            <dt>작성일</dt>
                            <dd>{boardInfo.date}</dd>
                        </dl>
                        <dl>
                            <dt>조회</dt>
                            <dd>{boardInfo.count}</dd>
                        </dl>
                    </div>
                    <div className="cont">
                        <img
                        style={{
                            width: '-webkit-fill-available'
                        }}
                         src={imgSrc}/>
                        {boardInfo.content}
                    </div>
                </div>
                <div className="bt_wrap">
                    <button className='on' onClick={() => window.location.href = '/community'}>목록</button>
                    <button onClick={() => nav('/community/edit/' + num, { state: { data: borderInfo } })}>수정</button>
                </div>
            </div>
        </div>


    )
}

export default View