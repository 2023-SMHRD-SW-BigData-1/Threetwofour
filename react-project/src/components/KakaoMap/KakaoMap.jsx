import React, { useState } from 'react';
import Map from './Map'

const KakaoMap = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState('볼링장 카카오')
  const [count, setCount] = useState(0)

  const onChange = (e) => {
    setText(e.target.value);
  }
  const submit = (e) => {
    setText(text)
    setResult(text)
    setText('')
    setCount(1)
  }

  return (
    <>
    <div className="section-1">
      <Map value={result} count={count}/>
      <div  style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
    }}>
        <input style={{
          margin: '10px',
          height: '40px',
          borderStyle: 'solid',
          borderColor: '#3399FF',
          borderRadius: '50px 50px',
          textAlign: 'center'
        }} className="input" onChange={onChange} placeholder="찾고싶은 볼링장을 입력해주세요 :-)" value={text}></input> <br />
        <button type="submit" className="btn" onClick={submit}>원하시는 볼링장으로 이동!😊</button>
      </div>
    </div>
    </>
  );
}

export default KakaoMap