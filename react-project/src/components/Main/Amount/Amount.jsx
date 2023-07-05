import React from 'react'

const Amount = ({ contentsResult }) => {
    return (
            <ul className="amount">

                {contentsResult.map(item => 
                    <li key={item.contents1}>
                        <div>
                            <div className="contents1">{item.contents1}</div>
                            <div className="result">{item.result}</div>
                        </div>
                    </li>
                )}

            </ul>
    )
}

export default Amount