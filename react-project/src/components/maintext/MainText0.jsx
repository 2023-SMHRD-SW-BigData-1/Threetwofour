import React from 'react'
import icon from '../../img/icon.svg'

const MainText0 = () => {
    return (
        <div className="main_text0">
            <h1>START GAME!</h1>
            <div className="contents1">다양한 경기로 또 한번의 짜릿한 승리를 거둬보세요!</div>

            <ul className="icons">
                <li>
                    <div className="icon_img">
                        <img src={icon} />
                    </div>
                    <div className="contents1_bold">"저희랑 게임해요!" </div>
                    <div className="contents2">
                        <div>324팀</div>
                        <h3>
                            일시 {'->'} 7/2일😊 장소 {'->'} 지산볼링장👓

                        </h3>
                    </div>
                    <div className="more">
                        MORE
                    </div>
                </li>

                <li>
                    <div className="icon_img">
                        <img src={icon} />
                    </div>
                    <div className="contents1_bold">"저보다 볼링 잘하는사람있나요?"</div>
                    <div className="contents2">
                        <div>볼링왕팀</div>
                        <h3>
                        일시{'->'} 6/30일 장소{'->'}첨단CLUB300

                        </h3>
                    </div>
                    <div className="more">
                        MORE
                    </div>
                </li>

                <li>
                    <div className="icon_img">
                        <img src={icon} />
                    </div>
                    <div className="contents1_bold">매칭중</div>
                    <div className="contents2">
                        <div>이준혁팀VS마동석팀</div>
                        <div>매칭중💥💥💥💥</div>
                    </div>
                    <div className="more">
                        MORE
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default MainText0