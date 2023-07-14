import React from 'react'
import icon from '../../../img/icon.svg'
import { useNavigate } from 'react-router-dom'

const MainText0 = ({ mainText }) => {

    const nav = useNavigate()

    const matchTeam = (e)=>{
        console.log(e);
        nav(`/clubList/${e}`)
    }

    return (
        <div className="main_text0">
            <h1>START GAME!</h1>
            <div className="contents1">다양한 경기로 또 한번의 짜릿한 승리를 거둬보세요!</div>

            <ul className="icons">

                {mainText.map(item =>
                    <li key={item.num}>
                        <div className="icon_img">
                            <img src={icon} />
                        </div>
                        <div className="contents1_bold">{item.contents} </div>
                        <div className="contents2">
                            <div>{item.team}팀</div>
                            <h3>
                                일시 {'->'} {item.date} <br />장소 {'->'} {item.location}

                            </h3>
                        </div>
                        <button className="more" onClick={()=>matchTeam(`${item.team}`)}>MORE</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default MainText0