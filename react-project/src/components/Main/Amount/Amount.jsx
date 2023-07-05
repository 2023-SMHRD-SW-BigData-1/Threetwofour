import React from 'react'

const Amount = ({ contentsResult }) => {
    return (
        <div>
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
        </div>
    )
}

export default Amount