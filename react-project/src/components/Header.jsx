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
            <div className='menuBox'>
                <div className="searchArea">
                    <form action='/' method='get'>
                        <input type="search" placeholder="search" name='search' ref={searchRef} />
                        <button type='submit' onClick={searchBtn}>검색</button>
                    </form>
                </div>

                <div className='navBox'>
                    <ul className="navList">
                        <li><Link to={'/'}>HOME</Link></li>
                        <li><Link to={'/clubList/'}>JOIN CLUB</Link></li>
                        <li><Link to={'/service/'}>SERVICE</Link></li>
                        <li><Link to={'/community/'}>COMMUNITY</Link></li>
                        {!sessionStorage.getItem('user') ?
                            <>
                                <li><Link to={'/user/join'}>JOIN</Link></li>
                                <li><Link to={'/user/login'}>LOGIN</Link></li>

                            </>
                            :
                            <>
                                <li><Link to={'/user/mypage'}>MY PAGE</Link></li>
                                <li><Link to={'/user/logout'}>LOGOUT</Link></li>
                            </>}
                    </ul>
                </div>

            </div>
            <div style={{ textAlign: 'center' }}>
                <img src={TitleLogo} style={{ height: '15rem', marginTop: '0px', paddingTop: 0, marginLeft: '40px', overflow: 'hidden' }} alt="" />
            </div>
        </div>
    )
}

export default Header