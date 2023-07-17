import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link, useParams } from 'react-router-dom';

const Page = ({ pageNo, setPageNo }) => {

    const { num } = useParams()
    const no = parseInt(num) || 1;


    const [startNum, setStartNum] = useState(0)
    const [endNum, setEndNum] = useState(5)
    const [page, setPage] = useState(pageNo.slice(startNum, endNum))
    useEffect(() => {

        const pageSet = () => {
            if (no - 3 < 0) {
                setStartNum(0);
            } else if (no - 3 < pageNo[pageNo.length - 1] - 5) {
                setStartNum(no - 3);
            } else {
                setStartNum(pageNo[pageNo.length - 1] - 5);
            }

            if (no + 2 < 5) {
                setEndNum(5);
            } else {
                setEndNum(no + 2);
            }

            setPage(pageNo.slice(startNum, endNum));
        };

        pageSet();
    }, [startNum, endNum, no, pageNo]);

    return (
        <div className="board_page">
            <Pagination>
                <Link to={'/community/'} className='bt first'>{'<<'}</Link>
                <Link to={no - 1 <= 0 ? '/community/page/1' : '/community/page/' + (no - 1)} className='bt prev'>{'<'}</Link>
                {startNum > 0 && <Link to={'/community/page/1'} className='num' >{1}</Link>}
                {startNum > 0 && <Pagination.Ellipsis />}
                {page.map(item => <Link key={item} to={'/community/page/' + item} className={no == item ? 'num on' : 'num'}>{item}</Link>)}
                {endNum <= pageNo[pageNo.length - 3] && <Pagination.Ellipsis />}
                {endNum < pageNo[pageNo.length - 1] && <Link to={'/community/page/' + pageNo[pageNo.length - 1]} className='num' >{pageNo[pageNo.length - 1]}</Link>}
                <Link to={(parseInt(no) + 1) <= pageNo.length - 1 ? '/community/page/' + (parseInt(no) + 1) : '/community/page/' + (pageNo.length)} className='bt next'>{'>'}</Link>
                <Link to={'/community/page/' + pageNo[pageNo.length - 1]} className='bt last'>{'>>'}</Link>
            </Pagination>
        </div>

    )
}

export default Page