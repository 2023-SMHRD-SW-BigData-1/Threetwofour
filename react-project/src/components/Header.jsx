import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to='/main'>메인</Link>
            </li>
            <li>
                <Link to='/user/join'>회원가입</Link>
            </li>
            <li>
                <Link to='/user/login'>로그인</Link>
            </li>
        </ul>
    </div>
  )
}

export default Header