import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const nav = useNavigate()

    useEffect(() => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('score')
        nav('/')
    }, [])
    return (
        <div></div>
    )
}

export default Logout