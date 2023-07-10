import React from 'react'
import bowlingShadow from '../../../img/BowlingShadow.png'
import KakaoMap from '../../KakaoMap/KakaoMap'

const MainText1 = () => {
    return (
        <div className="main_text1">
            <div className="service">
                <div className="food_photo">
                    <img src={bowlingShadow} style={{ height: "23rem",  paddingTop: 0, overflow: "hidden" }} />
                    <div>
                        <h1>SPARECITY</h1>
                        <div className="contents1">저희 플랫폼에서 즐길수 있는 다양한 매칭 시스템과, 볼링장 평가기능으로 더 즐거운 볼링생활을 즐겨요.</div>
                    </div>
                </div>
                <div className="contents2">
                    <KakaoMap />
                </div>
            </div>
        </div>
    )
}

export default MainText1