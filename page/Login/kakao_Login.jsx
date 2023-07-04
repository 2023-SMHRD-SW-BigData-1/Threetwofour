

const kakao_Login = ()=>
{
    const Rest_api_key='c4221bdbd785e209906c4732b78c965a' //REST API KEY
    const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
    
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    
    return(
 
        <div>
            <button onClick={handleLogin}>
                카카오
            </button>
        </div>
        // <LoginContainer>
        //     <LoginWrapper>
        //         <header>SPARECITY에 오신 걸 환영합니다</header>
        //         <article>wow!</article>
        //         <kakaoBtn onClick={handleLogin}>
        //             <kakaoBubble />
        //             <p>카카오 로그인</p>
        //         </kakaoBtn>
        //         <SocialLogin>

        //         </SocialLogin>

        //     </LoginWrapper>
        // <button onClick={handleLogin}>카카오 로그인</button>
        // </LoginContainer>
    )
}
export default kakao_Login

