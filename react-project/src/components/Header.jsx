import React, { useRef } from 'react'
import TitleLogo from '../img/Spare City.png'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {

    const searchRef = useRef();
    const nav = useNavigate();

    const searchBtn = (e) => {
        e.preventDefault();
        console.log(searchRef.current.value);
        nav(`?search=${searchRef.current.value}`)
    }

    return (
        <div className="header">
            <div className="searchArea">
                <form action='/' method='get'>
                    <input type="search" placeholder="search" name='search' ref={searchRef} />
                    <button type='submit' onClick={searchBtn}>검색</button>
                </form>
                <div style={{ textAlign: 'center' }}>
                    <img src={TitleLogo} style={{ height: '15rem', marginTop: '0px', paddingTop: 0, marginLeft: '40px', overflow: 'hidden' }} alt="" />
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