import React, { useEffect, useState } from 'react'
import MainText0 from './maintext/MainText0'
import MainText1 from './maintext/MainText1'
import MainText2 from './maintext/MainText2'



const MainText = () => {

    const [mainText0, setMainText0] = useState([])

    useEffect(() => {
        console.log(JSON.parse(sessionStorage.getItem('clubMore')));

        setMainText0(JSON.parse(sessionStorage.getItem('clubMore')))

        // [
        //     { num: 1, contents: '"저희랑 게임해요!"', team: '324', date: '7/2일😊', location: '지산볼링장👓', matchNow: '' },
        //     { num: 2, contents: '"저보다 볼링 잘하는사람있나요?"', team: '볼링왕', date: '6/30일', location: '첨단CLUB300', matchNow: '' },
        //     { num: 3, contents: '매칭중', team: '이준혁팀VS마동석팀', date: '매칭중💥💥💥💥', location: '', matchNow: '' }
        // ]
    }, [])

    return (
        <>
            <MainText0 mainText={mainText0} />
            <MainText1 />
            <MainText2 />
        </>
    )
}

export default MainText