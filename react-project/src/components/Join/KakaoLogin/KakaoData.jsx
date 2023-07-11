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

    console.log(code);
    const navigatioin = useNavigate();

    const getKAKAO = async () => {
        const data = qs.stringify({
            grant_type: "authorization_code",
            client_id: KAKAO_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            client_secret: KAKAO_CLIENT_ID,
        });

        const result = await axios({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            data: data,
        });

        // kakao Javascript SDK 초기화
        window.Kakao.init(KAKAO_API_KEY);

        window.Kakao.Auth.setAccessToken(result.data.access_token);

        const kakaoData = await window.Kakao.API.request({
            url: "/v2/user/me",
        });

        console.log(result.data.access_token);
        console.log(kakaoData);



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

        navigatioin("/");
    };

    React.useEffect(() => {
        getKAKAO();
    }, []);

    return <div>카카오 데이터 받는곳</div>;
}

export default KakaoData