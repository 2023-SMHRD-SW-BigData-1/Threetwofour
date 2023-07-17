import React from 'react'
import { Link } from 'react-router-dom'

const Border = ({ num, writer, date, count, data, title }) => {
    return (
        <div>
            <div className="num">{num}</div>
            <div className="title"><Link to={'/community/view/' + num} state={{ data: data }}>{title}</Link></div>
            <div className="writer">{writer}</div>
            <div className="date">{date}</div>
            <div className="count">{count}</div>
        </div>
    )
}

export default Border