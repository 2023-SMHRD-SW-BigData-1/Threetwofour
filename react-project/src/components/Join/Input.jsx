import React, { useContext } from 'react'

const Input = React.forwardRef(({ text, type, placeholder, valid, handleData, data, textStyle }, ref) => {

    return (
        <>
            <div className="inputTitle" style={textStyle}>{text[0]}</div>
            <div className="inputWrap">
                <input
                    className="input"
                    type={type}
                    ref={ref}
                    placeholder={placeholder}
                    onChange={handleData}
                />
            </div>
            <div className="errorMessageWrap">
                {!valid && data.length > 0 && (
                    <div style={{color:'#ef0000'}}>{text[1]}</div>
                )}
            </div>
        </>
    )
})


export default Input