import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainText2 = () => {
    const nav = useNavigate();
    return (
        <div className='main_text2'>
            <ul>
                <li>
                        <h1>CONTACT</h1>
                    우리의 플랫폼에서 매칭을 신청하거나, 고객이 되어주세요
                    <div className="more2" onClick={()=>{nav('/contact/')}}>더 알아보기</div>
                </li>
            </ul>
        </div>
    )
}

export default MainText2