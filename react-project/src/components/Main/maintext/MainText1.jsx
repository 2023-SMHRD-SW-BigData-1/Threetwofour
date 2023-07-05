import React from 'react'
import bowlingShadow from '../../../img/BowlingShadow.png'

const MainText1 = () => {
    return (
        <div className="main_text1">
            <h1>SPARECITY</h1>
            <div className="contents1">저희 플랫폼에서 즐길수 있는 다양한 매칭 시스템과, 볼링장 평가기능으로 더 즐거운 볼링생활을 즐겨요.</div>
            <div className="service">
                <div className="food_photo">
                    <img src={bowlingShadow} style={{height: "23rem", marginTop: "-100px", paddingTop: 0, overflow: "hidden"}} />
                </div>
                <div className="contents2">

                </div>
            </div>
        </div>
    )
}

export default MainText1