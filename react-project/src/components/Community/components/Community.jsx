import React, { useEffect } from 'react'
import Border from './Border'
import { useParams } from 'react-router-dom';

const Community = ({ data }) => {

    const { num } = useParams();
    let no = num || 1;

    return (
        <>
            {data[no - 1].map(item => <Border key={item.num} num={item.num} writer={item.writer} date={item.date} count={item.count} data={item} title={item.title} />)}
        </>
    )
}

export default Community