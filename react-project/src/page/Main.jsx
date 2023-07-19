import React, { useEffect, useState } from 'react'
import Amount from '../components/Main/Amount/Amount'
// import Footer from '../components/Footer'
import MainText from '../components/Main/MainText'
import Wrap from '../components/Main/Wrap'
import axios from 'axios'

const Main = () => {

  const [gameCount, setGameCount] = useState(0)
  const [todayGameCount, setTodayGameCount] = useState(0)

  const [contentsResult, setContentsReslut] = useState([
    { contents1: '지금까지 매칭게임수', result: gameCount + ' 게임' },
    { contents1: '오늘 남은 매칭수', result: todayGameCount + ' 게임' },
    { contents1: '이번주 볼링왕🥰', result: '324팀소속 오승원님' },
    { contents1: '주간볼링장순위⚡', result: '1.지산볼링장 △' }
  ])

  const matchAxios = async () => {
    const result = await axios.get('http://localhost:8888/DB/match')

    setGameCount(result.data.games.length)
    setTodayGameCount(result.data.todayGames.length)

  }

  useEffect(() => {

    matchAxios()

    const clubData = async () => {
      const result = await axios.get('http://localhost:8888/DB/club')

      sessionStorage.setItem('club', JSON.stringify(result.data))


    }
    clubData()

    const clubMore = async () => {
      const result = await axios.get('http://localhost:8888/DB/club/more')

      sessionStorage.setItem('clubMore', JSON.stringify(result.data))

    }

    clubMore()

    console.log(todayGameCount);

  }, [])

  useEffect(()=>{
    setContentsReslut([
      { contents1: '지금까지 매칭게임수', result: gameCount + ' 게임' },
      { contents1: '오늘 남은 매칭수', result: todayGameCount + ' 게임' },
      { contents1: '이번주 볼링왕🥰', result: '324팀소속 오승원님' },
      { contents1: '주간볼링장순위⚡', result: '1.지산볼링장 △' }
    ])
  },[gameCount, todayGameCount])

  return (
    <>
      <Wrap />
      <Amount contentsResult={contentsResult} />
      <MainText />
      {/* <Footer /> */}
    </>
  )
}

export default Main