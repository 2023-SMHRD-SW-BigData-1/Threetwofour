import React from 'react'
import Amount from '../components/Amount/Amount'
import Footer from '../components/Footer'
import MainText from '../components/MainText'
import Wrap from '../components/Wrap'

const Main = () => {
  let contents1 = ['지금까지 매칭게임수', '진행중인 매치', '이번주 볼링왕🥰', '주간볼링장순위⚡']
  let result = ['32,078게임', '1,024게임', '324팀소속 오승원님', '1.지산볼링장 △']

  let contentsResult = [
    ['지금까지 매칭게임수','32,078게임'],
    ['진행중인 매치','1,024게임'],
    ['이번주 볼링왕🥰','324팀소속 오승원님'],
    ['주간볼링장순위⚡','1.지산볼링장 △']
  ]

  console.log(contentsResult);

  console.log(contentsResult);
  return (
    <div>
      <Wrap />
      <Amount contentsResult={contentsResult} result={result} />
      <MainText />
      <Footer />
    </div>
  )
}

export default Main