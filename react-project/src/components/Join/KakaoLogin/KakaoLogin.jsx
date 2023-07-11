import React from 'react'
import axios from "axios";
import qs from "qs";
import { Route, Routes, useNavigate } from "react-router-dom";
import kakaoLoginIcon from '../../../img/kakao_login_medium_narrow.png'

const KakaoSocialLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

function KakaoIcon() {
    return (
        <div
            onClick={() => {
                window.location.href = KakaoSocialLoginLink;
            }}
            style={{
                borderRadius: '12px',
                marginTop: '26px',
                marginLeft: '13px',
                cursor: 'pointer'
            }}
            className="kakao_Container">
            <img src={kakaoLoginIcon} />

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