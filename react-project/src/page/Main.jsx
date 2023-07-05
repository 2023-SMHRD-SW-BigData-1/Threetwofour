import React from 'react'
import Amount from '../components/Main/Amount/Amount'
import Footer from '../components/Main/Footer'
import MainText from '../components/Main/MainText'
import Wrap from '../components/Main/Wrap'

const Main = () => {

  let contentsResult = [
    { contents1: '지금까지 매칭게임수', result: '32,078게임' },
    { contents1: '진행중인 매치', result: '1,024게임' },
    { contents1: '이번주 볼링왕🥰', result: '324팀소속 오승원님' },
    { contents1: '주간볼링장순위⚡', result: '1.지산볼링장 △' }
  ]

  return (
    <>
      <Wrap />
      <Amount contentsResult={contentsResult} />
      <MainText />
      <Footer />
    </>
  )
}

export default Main