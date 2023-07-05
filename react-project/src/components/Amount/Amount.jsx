import React from 'react'

const Amount = ({contentsResult}) => {
    return (
        <div>
            <ul className="amount">

                <li>
                    <div>
                        <div className="contents1">지금까지 매칭게임수</div>
                        <div className="result">32,078게임</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div className="contents1">진행중인 매치</div>
                        <div className="result">1,024게임</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div className="contents1">이번주 볼링왕🥰</div>
                        <div className="result">324팀소속 오승원님</div>
                    </div>
                </li>
                <li>
                    <div>
                        <div className="contents1">주간볼링장순위⚡</div>
                        <div className="result">1.지산볼링장 △</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Amount