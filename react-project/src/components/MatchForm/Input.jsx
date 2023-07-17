import React from 'react'

const Input = React.forwardRef(({text, type, placeholder, valid, handleData, data},ref)=>{
    return(
        <>
        <div className='inputTitle'>{text[0]}</div>
        <div className='inputWrap'>
            <input 
                className='input'
                type={type}
                ref={ref}
                placeholder={placeholder}
                onChange={handleData}/>
        </div>
        <div className='errorMessageWrap'>
            {!valid && data.length > 0 && (
                <div style={{color : '#ef0000'}}></div>
                // 여기 수정해야할 것 같은데, 어떻게 수정해야할지?
                // 지역을 어디까지 써야하는지? 구까지? 동까지?
            )}
        </div>
        </>
    )
})

export default Input