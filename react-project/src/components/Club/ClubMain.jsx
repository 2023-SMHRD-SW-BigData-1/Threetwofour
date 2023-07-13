import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import TeamContent from './TeamContent';
import imgSrc from '../../img/business-man.png'
import t1 from '../../img/ti.jpg'
import './club.css'
import axios from 'axios';


const ClubMain = () => {

    const [dataList, setDataList] = useState([])

    useEffect(() => {


        const clubData = async () => {
            const result = await axios.get('http://localhost:8888/DB/club')

            setDataList(result.data)

        }
        clubData()

    }, [])

    return (

        <section className="team">
            <div className="center">
                <div className='center'>
                    <h1>SPARECITY CLUB LIST🥇</h1>
                </div>

                {dataList.map(item => <Link key={item.clubSeq} to={item.clubName}><h1>{item.clubName} 팀🏆</h1></Link>)}

            </div>

            <Routes>
                {dataList.map(item =>
                    <Route
                        key={item.clubSeq}
                        path={'/' + item.clubName}
                        element={<TeamContent key={item.clubSeq} team={item.memberInfo} imgSrc={t1} />} />
                )}
            </Routes>

        </section>
    )
}

export default ClubMain