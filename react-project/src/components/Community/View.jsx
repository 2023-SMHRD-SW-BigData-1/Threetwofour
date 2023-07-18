import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const View = () => {
    const { num } = useParams()
    const location = useLocation()
    const borderInfo = location.state.data;
    const nav = useNavigate()
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
                        {borderInfo.title}
                    </div>
                    <div className="info">
                        <dl>
                            <dt>번호</dt>
                            <dd>{borderInfo.num}</dd>
                        </dl>
                        <dl>
                            <dt>글쓴이</dt>
                            <dd>{borderInfo.writer}</dd>
                        </dl>
                        <dl>
                            <dt>작성일</dt>
                            <dd>{borderInfo.date}</dd>
                        </dl>
                        <dl>
                            <dt>조회</dt>
                            <dd>{borderInfo.count}</dd>
                        </dl>
                    </div>
                    <div className="cont">
                        {borderInfo.content}
                    </div>
                </div>
                <div className="bt_wrap">
                    <button className='on' onClick={() => nav('/community/')}>목록</button>
                    <button onClick={() => nav('/community/edit/' + num, { state: { data: borderInfo } })}>수정</button>
                </div>
            </div>
        </div>


    )
}

export default View