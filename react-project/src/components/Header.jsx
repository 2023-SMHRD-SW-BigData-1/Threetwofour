import React from 'react'
import TitleLogo from '../img/Spare City.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header">
            <div className="searchArea">
                <form>
                    <input type="search" placeholder="search" />
                        <span>검색</span>
                </form>
                <div style={{textAlign: 'center'}}>
                    <img src={TitleLogo} style={{height: '15rem', marginTop: '0px', paddingTop: 0, marginLeft: '40px', overflow: 'hidden'}} alt="" />
                </div>
            </div>
            <ul className="nav">
                <li><Link to={'/'}>HOME</Link></li>
                <li><Link to={'/'}>JOIN CLUB</Link></li>
                <li><Link to={'/'}>SERVICE</Link></li>
                <li><Link to={'/'}>COMMUNITY</Link></li>
                <li><Link to={'/user/login'}>LOGIN</Link></li>
            </ul>
        </div>
    )
}

export default Header