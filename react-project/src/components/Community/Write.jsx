import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Write = () => {

    const titleRef = useRef()
    const fileRef = useRef()
    const contentRef = useRef()

    var formData = new FormData();

    const userInfo = JSON.parse(sessionStorage.getItem('user'))[0]

    const [boardInfo, setBoardInfo] = useState({
        title: '',
        memId: userInfo.MEM_ID,
        content: '',
        fileName: ''
    })


    useEffect(() => {



    }, [boardInfo])



    // const [file, setFile] = useState<File>(null);

    const boardHandler = (e) => {
        setBoardInfo({
            title: titleRef.current.value,
            memId: userInfo.MEM_ID,
            content: contentRef.current.value,
            fileName: fileRef.current.files
        })
        // console.log('빈 파일', file);
        // setFile(fileRef.current.files[0])
        // console.log('이 파일은 : ', file);

    }

    const boardAxios = async () => {

        console.log('formData', formData.getAll('file'))

        const result = (await axios.post('http://localhost:8888/DB/community/input', formData)).data
        console.log('result', result);
        if (result) {
            Swal.fire({
                icon: 'success',
                title: '게시물 작성',
                text: '게시물이 작성 되었습니다.',
                showCancelButton: false,
                confirmButtonAriaLabel: '확인'
            }).then((result) => {

                window.location.href = '/community'

            })
        } else {
            Swal.fire({
                icon: 'error',
                title: '게시물 작성',
                text: '게시물 작성에 실패하셨습니다.',
                showCancelButton: false,
                confirmButtonAriaLabel: '확인'
            }).then((res) => {

                // 회원가입 실패

            })
        }

    }


    // 클릭했을 때 

    const uploadBoard = (e) => {

        e.preventDefault()

        console.log(e.target)
        // console.log('게시판 정보', boardInfo);
        // console.log(boardInfo);

        formData.append('title', titleRef.current.value)
        formData.append('memId', userInfo.MEM_ID)
        formData.append('content', contentRef.current.value)
        formData.delete('file')

        for (let i = 0; i < fileRef.current.files.length; i++) {
            formData.append('file', fileRef.current.files[i])
        }

        boardAxios()

    }


    return (


        <div className="board_wrap">

            <div className="board_title">
                <strong>게시판 이름</strong>
                <p>게시판 설명</p>
            </div>
            <form encType='multipart/form-data'>
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
                        </div>
                        <div className="cont">
                            <textarea placeholder="내용 입력" onChange={boardHandler} ref={contentRef}></textarea>
                        </div>
                        <div className='info' style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            flexWrap: 'nowrap',
                            height: '100%'
                        }}>
                            <dl style={{ width: 'auto' }}>
                                <dt>첨부파일</dt>
                            </dl>
                            <dl style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '-webkit-fill-available',
                                justifyContent: 'space-between'
                            }}>
                                <dd style={{ width: '100%' }}>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={boardHandler}
                                        ref={fileRef}
                                    />
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bt_wrap">

                        <button className='on' onClick={uploadBoard}>등록</button>
                        <Link to={'/community/'}>취소</Link>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Write