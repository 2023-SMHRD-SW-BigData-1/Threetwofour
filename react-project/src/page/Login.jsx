import React, { useContext, useEffect, useRef, useState } from 'react'
import Input from '../components/Join/Input';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import KakaoLogin from '../components/Join/KakaoLogin/KakaoLogin';

const Login = () => {

  // REST API 키
  const KAKAO_API_KEY = "85cec221b4aae92985aaeca299aef5cc";

  // JavaScript 키
  const KAKAO_CLIENT_ID = "74aacd4ce5f7641cfe680a20e6aa8c53";

  // REDIRECT_URI
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

  const KakaoSocialLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;



  const [userData, setUserData] = useState({
    mem_id: '',
    mem_pw: ''
  })

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const emailRef = useRef()
  const pwRef = useRef()

  const nav = useNavigate()

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleData = () => {

    setUserData({
      mem_id: emailRef.current.value,
      mem_pw: pwRef.current.value
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

  }, [userData])

  const onClickConfirmButton = () => {
    if (!notAllow) {
      axios.post('http://localhost:8888/DB/user/login', { userData: userData })
        .then((res) => {

          // 로그인 성공
          if (res.data.result) {

            Swal.fire({
              icon: 'success',
              title: '로그인',
              text: '로그인이 완료되었습니다.',
              showCancelButton: false,
              confirmButtonAriaLabel: '확인'
            }).then((result) => {

            

              // 로그인 성공
              sessionStorage.setItem('user', res.data.data.user)
              sessionStorage.setItem('score', res.data.data.score)

              nav('/')

            })

          } else { // 로그인 실패

            Swal.fire({
              icon: 'error',
              title: '로그인',
              text: '로그인에 실패하셨습니다.',
              showCancelButton: false,
              confirmButtonAriaLabel: '확인'
            }).then((res) => {

              // 회원가입 실패

            })
          }
        })
        .catch(() => { console.error('Failed to Login'); })
    }
  }

  return (
    <div className="page">
      <div className="titleWrap">
        <h3>SPARECITY에 오신것을 환영합니다!</h3>
        <h3>로그인을 해주세요!</h3>
      </div>

      <div className="contentWrap">

        <Input
          text={['이메일 주소', '올바른 이메일을 입력해주세요.']}
          ref={emailRef}
          type={'text'}
          placeholder={'test@gmail.com'}
          valid={emailValid}
          handleData={handleData}
          data={userData.mem_id}
        />

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

        <KakaoLogin />

        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>

      </div>
    </div>
  )
}

export default Login