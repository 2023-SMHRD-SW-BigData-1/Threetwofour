import React from 'react'
import axios from "axios";
import qs from "qs";
import { Route, Routes, useNavigate } from "react-router-dom";

const KakaoSocialLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

function KakaoIcon() {
    return (
        <div
            onClick={() => {
                window.location.href = KakaoSocialLoginLink;
            }}
            style={{
                display: "inline-block",
                width: 200,
                padding: 20,
                margin: 100,
                backgroundColor: "yellow",
                cursor: "pointer",
            }}
            className="App"
        >
            카카오 로그인
        </div>
    );
}


const KakaoLogin = () => {
    return (
        <Routes>
            <Route exact path="/" element={<KakaoIcon />} />
        </Routes>
    )
}

export default KakaoLogin