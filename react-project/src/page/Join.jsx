import React, { useEffect, useState } from 'react'


const Join = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwsummit, setpwsummit] = useState('');
  const [nick, setNick] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwsummitValid, setPwsummitValid] = useState(false);
  const [nickValid, setNickValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [inputTitlesummit, setinputTitlesummit] = useState(true);

  useEffect(() => {

    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);

  };

  const handlePwsummit = (e) => {
    setpwsummit(e.target.value);
  };

  const handleNick = (e) =>{
    setNick(e.target.value)
  }

  useEffect(() => {
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(pw)) {
      setPwValid(true);
      console.log(pw);
      console.log(pwValid);
    } else {
      setPwValid(false);
    }
  }, [pw])

  useEffect(() => {
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(pwsummit)) {
      if (pw === pwsummit) {
        // 비밀번호가 일치하는 경우
        setPwsummitValid(true);
      } else {
        // 비밀번호가 불일치하는 경우
        setPwsummitValid(false);
      }
    } else {
      if (pw === pwsummit) {
        // 비밀번호가 일치하는 경우
        setPwsummitValid(true);
      } else {
        // 비밀번호가 불일치하는 경우
        setPwsummitValid(false);
      }
    }
  }, [pwsummit])

  useEffect(()=>{
    
  },[nick])

  const onClickConfirmButton = () => {

  }

  return (
    <div className="page">
      <div className="titleWrap">
        <h3>아직 SPARECITY회원이 아니신가요?</h3>
        <h3>회원가입을 해주세요!</h3>
      </div>

      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호 확인
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pwsummit}
            onChange={handlePwsummit}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwsummitValid && pwsummit.length > 0
            ? (!(pwsummit === '') && !(pw === '') && <div>비밀번호가 불일치합니다</div>)
            : (!(pwsummit === '') && !(pw === '') && <div style={{ color: 'green' }} >비밀번호가 일치합니다</div>)
          }
        </div>
        <div style={{marginTop:'26px'}} className='inputTitle'>닉네임</div>
        <div className='inputWrap'>
          <input
          className='input'
          type="text"
          placeholder='닉네임을 입력해주세요.'
          value={nick}
          onChange={handleNick}
          />
        </div>
        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>
      </div>

    </div>
  )
}

export default Join