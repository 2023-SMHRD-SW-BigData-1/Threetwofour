import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import qs from "qs";

// REST API 키
const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

// JavaScript 키
const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;

// REDIRECT_URI
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const KakaoData = () => {
    const code = new URL(window.location.href).searchParams.get("code");

    const navigatioin = useNavigate();

    const getKAKAO = async () => {
        const data = qs.stringify({
            grant_type: "authorization_code",
            client_id: KAKAO_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            client_secret: KAKAO_CLIENT_ID,
        });

        const res = await axios({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            data: data,
        });

        // kakao Javascript SDK 초기화
        window.Kakao.init(KAKAO_API_KEY);

        window.Kakao.Auth.setAccessToken(res.data.access_token);

        const kakaoData = await window.Kakao.API.request({
            url: "/v2/user/me",
        });

        // console.log(res.data.access_token);
        // console.log(kakaoData);



        /**
         * 1.
         *  - 우리 Node.js 호출 !
         *  - kakaData 넣어주기~
         * 
         * 2.
         *  - LocalStorage 사용
         * 3.
         *  - 전역변수 설정 LoginUser !
         * 
         */

        let userData = {
            mem_id: kakaoData.kakao_account.email,
            mem_pw: String(kakaoData.id),
            mem_nick: kakaoData.properties.nickname,
            mem_region: " "
        }

        let result = (await axios.post('http://localhost:8888/DB/user/login', { userData: userData })).data

        // 로그인
        if (result.result) {
            console.log(result.data);
            sessionStorage.setItem('user', result.data.user)
            sessionStorage.setItem('score', result.data.score)
        } else { // 회원이 없음

            result = (await axios.post('http://localhost:8888/DB/user/join', { userData: userData })).data

            if (result) {

                result = (await axios.post('http://localhost:8888/DB/user/login', { userData: userData })).data

                sessionStorage.setItem('user', result.data.user)
                sessionStorage.setItem('score', result.data.score)

            }

        }

        console.log(sessionStorage.getItem('score'));

        navigatioin("/");

    };

    React.useEffect(() => {
        getKAKAO();
    }, []);

    return <div>카카오 데이터 받는곳</div>;
}

export default KakaoData