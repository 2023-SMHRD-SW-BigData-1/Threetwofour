import React, { useEffect, useRef, useState } from 'react'
import Input from '../components/Join/Input';
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AdressApp from '../components/Join/AdressApp';

const Join = () => {


  const [userData, setUserData] = useState({
    mem_id: '',
    mem_pw: '',
    pwsummit: '',
    mem_nick: '',
    mem_region: ''
  })

  const [emailValid, setEmailValid] = useState(false);
  const [emailcheckRedundancyValid, setEmailCheckRedundancyValid] = useState(false)
  const [clickBtn, setClickBtn] = useState(false)
  const [pwValid, setPwValid] = useState(false);
  const [pwsummitValid, setPwsummitValid] = useState(false);
  const [nickValid, setNickValid] = useState(false);
  const [addValid, setAddValid] = useState(false)
  const [notAllow, setNotAllow] = useState(true);
  const [inputTitlesummit, setinputTitlesummit] = useState(true);

  const emailRef = useRef()
  const pwRef = useRef()
  const pwsummitRef = useRef()
  const nickRef = useRef()
  const addRef = useRef()

  const nav = useNavigate()

  useEffect(() => {


    if (emailValid && pwValid && pwsummitValid && nickValid && addValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, pwsummitValid, nickValid, addValid]);

  const handleData = () => {

    setClickBtn(false)

    setUserData({
      mem_id: emailRef.current.value,
      mem_pw: pwRef.current.value,
      pwsummit: pwsummitRef.current.value,
      mem_nick: nickRef.current.value,
      mem_region: addRef.current.value
    })
  }

  useEffect(() => {

    let regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(userData.mem_id)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(userData.mem_pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }

    if (regex.test(userData.pwsummit)) {
      if (userData.mem_pw === userData.pwsummit) {
        // 비밀번호가 일치하는 경우
        setPwsummitValid(true);
      } else {
        // 비밀번호가 불일치하는 경우
        setPwsummitValid(false);
      }
    } else {
      if (userData.mem_pw === userData.pwsummit) {
        // 비밀번호가 일치하는 경우
        setPwsummitValid(true);
      } else {
        // 비밀번호가 불일치하는 경우
        setPwsummitValid(false);
      }
    }

    regex =
      /^.{2,12}$/;

    if (regex.test(userData.mem_nick)) {
      setNickValid(true)
    } else {
      setNickValid(false)
    }

    regex =
      /^.{1,}$/;
    if (regex.test(userData.mem_region)) {
      setAddValid(true)
    } else {
      setAddValid(false)
    }
  }, [userData])


  const onClickConfirmButton = () => {
    if (!notAllow) {
      axios.post('http://localhost:8888/DB/user/join', { userData: userData })
        .then((res) => {

          if (res.data) {
            Swal.fire({
              icon: 'success',
              title: '정보 확인',
              text: '회원가입이 완료되었습니다.',
              showCancelButton: false,
              confirmButtonAriaLabel: '확인'
            }).then((res) => {

              // 회원가입 성공

              nav('/')

            })
          } else {
            Swal.fire({
              icon: 'error',
              title: '정보 확인',
              text: '회원가입에 실패하셨습니다.',
              showCancelButton: false,
              confirmButtonAriaLabel: '확인'
            }).then((res) => {

              // 회원가입 실패


            })
          }

        })
        .catch(() => { console.error('Failed to join'); })


    }

  }

  const checkRedundancy = async () => {
    if (emailValid) {
      const res = await axios.get('http://localhost:8888/DB/user/login/'+ userData.mem_id )
      
      console.log(res.data);
      
      if(!res.data){
        setEmailCheckRedundancyValid(true)
      }
      
      setClickBtn(true)
    }
  }

  return (
    <div className="page">
      <div className="titleWrap">
        <h3>아직 SPARECITY회원이 아니신가요?</h3>
        <h3>회원가입을 해주세요!</h3>
      </div>

      <div className="contentWrap">

        <Input
          text={['이메일 주소', '올바른 이메일을 입력해주세요']}
          ref={emailRef}
          type={'text'}
          placeholder={'test@gamil.com'}
          valid={emailValid}
          handleData={handleData}
          data={userData.mem_id}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className='postCode_btn' style={{ width: '10%', margin: '10px 0 10px 10px' }} disabled={(!emailValid)} onClick={checkRedundancy}>중복확인</button>
          {clickBtn ? (emailcheckRedundancyValid
            ? <div style={{ color: 'green', marginLeft: '5px' }}>사용가능한 아이디입니다.</div>
            : <div style={{ color: '#ef0000', marginLeft: '5px' }}>해당 아이디가 존재합니다.</div>)
            : <></>}
        </div>
        <Input
          text={['비밀번호', '영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.']}
          ref={pwRef}
          type={'password'}
          placeholder={'영문, 숫자, 특수문자 포함 8자 이상'}
          valid={pwValid}
          handleData={handleData}
          data={userData.mem_pw}
          textStyle={{ marginTop: "26px" }}
        />


        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호 확인
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            ref={pwsummitRef}
            onChange={handleData}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwsummitValid && userData.pwsummit.length > 0
            ? (!(userData.pwsummit === '') && !(userData.mem_pw === '') && <div style={{ color: '#ef0000' }}>비밀번호가 불일치합니다</div>)
            : (!(userData.pwsummit === '') && !(userData.mem_pw === '') && <div style={{ color: 'green' }} >비밀번호가 일치합니다</div>)
          }
        </div>

        <Input
          text={['닉네임', '2글자 이상 12글자 이하로 입력해주세요.']}
          ref={nickRef}
          type={'text'}
          placeholder={'2글자 이상 12글자 이하로 입력해주세요'}
          valid={nickValid}
          handleData={handleData}
          data={userData.mem_nick}
          textStyle={{ marginTop: "26px" }}
        />

        <AdressApp
          ref={addRef}
          data={userData}
          onChange={handleData}
        />

        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>
      </div>

    </div>
  )
}

export default Join;