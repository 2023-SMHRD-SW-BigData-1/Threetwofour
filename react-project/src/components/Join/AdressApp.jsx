import React, { useRef, useState } from 'react'
import PopupDom from './PopupDom'
import PopupPostCode from './PopupPostCode'

const AdressApp = React.forwardRef(({ data, setData, onChange }, ref) => {
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const zonecodeRef = useRef()

    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    return (
        <>
            <div className='inputTitle' style={{ marginTop: '26px' }}>사는 지역</div>
            <div style={{ display: "flex" }}>
                <div className='inputWrap'>
                    <input className='input' type="text" ref={zonecodeRef} placeholder='우편번호' readOnly />

                </div>
                <button className='bottomButton' type='button' style={btnStyle} onClick={openPostCode}>우편번호 검색</button>

            </div>
            <div className='inputWrap'>
                <input type="text" className='input' ref={ref} placeholder='우편번호 검색을 이용해주세요.' readOnly />
            </div>
            <div className='inputWrap'>
                <input type="text" className='input' placeholder='상세주소' />
            </div>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode ref={{ zonecodeRef, ref }} onChange={onChange} onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>
        </>
    )
})

const btnStyle = {
    width: '10%',
    height: 'auto',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '64px',
    backgroundColor: '#9e30f4',
    color: 'white',
    cursor: 'pointer',
    margin: '8px 32px 0'
}

export default AdressApp