import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Write = () => {

    const titleRef = useRef()
    const writerRef = useRef()
    const dateRef = useRef()
    const contentRef = useRef()


    return (


        <div class="board_wrap">
            <div class="board_title">
                <strong>게시판 이름</strong>
                <p>게시판 설명</p>
            </div>
            <div class="board_write_wrap">
                <div class="board_write">
                    <div class="title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" placeholder="제목 입력" /></dd>
                        </dl>
                    </div>
                    <div class="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd><input type="text" placeholder="글쓴이 입력" /></dd>
                        </dl>
                        <dl>
                            <dt>비밀번호</dt>
                            <dd><input type="password" placeholder="비밀번호 입력" /></dd>
                        </dl>
                    </div>
                    <div class="cont">
                        <textarea placeholder="내용 입력"></textarea>
                    </div>
                </div>
                <div class="bt_wrap">

                    <button className='on'>등록</button>
                    <Link to={'/community/'}>취소</Link>
                </div>
            </div>
        </div>
    )
}

export default Write