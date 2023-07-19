import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import MyImage from '../../img/BowlingShadow.png'
import Community from './components/Community'
import Page from './components/Page'
import './css/css.css'
const CommunityList = ({ data, pageNo, setData, setPageNo }) => {


    return (
        <div className="board_wrap" >
            <div className="board_title">

                <strong>SPARECITY COMMUNITY</strong>
                <p>자유롭게 소통하세요.</p>
            </div>
            <div style={{display:'flex'}}>
                <img src={MyImage} alt="" width="200px" height="200px" />
                <img src={MyImage} alt="" width="200px" height="200px" style={{ marginLeft: '-10' }} />
                <img src={MyImage} alt="" width="200px" height="200px" style={{ marginLeft: '0' }} />
                <img src={MyImage} alt="" width="200px" height="200px" style={{ marginLeft: '0' }} />
                <img src={MyImage} alt="" width="200px" height="200px" style={{ marginLeft: '0' }} />
            </div>

            <div className="board_list_wrap">
                <div className="board_list">
                    <div className="top">
                        <div className="num">번호</div>
                        <div className="title">제목</div>
                        <div className="writer">글쓴이</div>
                        <div className="date">작성일</div>
                        <div className="count">조회</div>
                    </div>

                    <Routes >
                        <Route path='/page/:num' exact element={<Community data={data} />} />
                        <Route path='/*' element={<Community data={data} />} />
                    </Routes>


                </div>
                <Routes>
                    <Route path='/' element={<Page pageNo={pageNo} />} />
                    <Route path='/page/:num' element={<Page pageNo={pageNo} />} />
                </Routes>

                <div className="bt_wrap">

                    <Link to={'/community/write'} className='on'>등록</Link>
                    {/* <a href="write.html" className="on">등록</a> */}
                </div>
            </div>
        </div>

    )
}

export default CommunityList