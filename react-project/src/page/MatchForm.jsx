import React, { useRef, useState } from 'react'
import Input from '../components/MatchForm/Input'
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale'
import { setMinutes } from 'date-fns';
import { setHours } from 'date-fns';
import Swal from 'sweetalert2'
import axios from 'axios'


const MatchForm = () => {

    const [userData, setUserDate] = useState({
        mem_region: '',

        mem_proposer: '', // sessionStorge('user')
        mem_acceptor: '', //=> 이전페이지 -> 회원클릭 -> 그 회원정보 => 어떻게 넘기고 받아올 건가
        matchDate: '', // -> 매칭 신청 날짜 ; sysdate
        acceptTime: '', // -> 어디에 저장하지? -> 신청 받은 사람이 수락했을 때 저장할 수 있게
        personnel: '', // 팀or개인 -> 변수에 담아서 데이터 넘기기
        matchAt: '', // -> 어느 볼링장에서 할 거야?
    })

    const regionRef = useRef();

    const bow_allRef = useRef();

    const personnelRef = useRef();
    const [teamValid, setTeamValid] = useState(false)

    const [select, setSelect] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const nav = useNavigate()
    
    const selecOptionhandler = (e) => {
        setSelect(e.target.value);
        console.log(personnelRef.current.value)

        if (personnelRef.current.value === 'team') { setTeamValid(true) }
        else { setTeamValid(false) }
    }

    const handleData = (e) => {
        setUserDate({
            mem_region: ''

        })
    }

    const submitButton = () => {

            axios.post('http://localhost:8888/DB/match/', { userData: userData })
                .then((res) => {
                    if (res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: '신청 확인',
                            text: '매칭 신청이 되었습니다.',
                            showCancelButton: false,
                            submitButton: '확인'
                        }).then((res) => {

                            // sessionStorage.setItem('user')
                            sessionStorage.getItem('user')
                            nav('/')
                            // 매칭 신청 성공

                        })
                    } else { 
                        Swal.fire({
                            icon: 'error',
                            title: '신청 취소',
                            text: '매칭 신청을 취소하셨습니다.',
                            showCancelButton: false,
                            submitButton: '확인'
                        }).then((res) => {
                            // 매칭 신청 실패
                        })
                    }
                })
                .catch(() => { console.error('Faied to matchApplication') })
    }

    return (
        <div className='body'>
            <form action="" id='matchForm' onSubmit={submitButton} >
                <div>
                    <label htmlFor=""></label>
                    <h2>SPARECITY에서 즐기는 Matching</h2>
                </div>
                <div>
                    <div className='form-group region'>
                        <Input
                            text={['지역']}
                            ref={regionRef}
                            type={'text'}
                            placeholder={'경기하고 싶은 지역을 기입해주세요.'}
                            onChange={handleData}
                            data={userData.mem_region}
                        />
                    </div>

                    <div className='matchDateTime'>
                        <div className='form-group date'>
                            매칭날짜
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat='yyyy년 MM월 dd일'
                                minDate={new Date()}
                                locale={ko}
                            />
                        </div>

                        <div className='form-group time'>
                            매칭시간
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="aa hh시 mm분"
                                minTime={setHours(setMinutes(new Date(), 0), 9)}
                                maxTime={setHours(setMinutes(new Date(), 30), 23)}
                            />
                        </div>
                    </div>
                    
                    <div className='form-group personnel'>
                        개인, 팀
                        <select
                            id='personnel'
                            onChange={selecOptionhandler}
                            ref={personnelRef}>
                            <option value="">개인, 팀 중 선택하세요</option>
                            <option value="individual">개인</option>
                            <option value="team">팀</option>
                        </select>

                        {teamValid && (
                            <select id='team-size'>
                                <option value="2">2명</option>
                                <option value="3">3명</option>
                                <option value="4">4명</option>
                                <option value="5">5명</option>
                            </select>
                        )}
                    </div>

                    <div className='form-group submit-btn'>
                        <input type='submit' value={'신청'} />
                    </div>
                    <div className='form-group submit-btn'>
                        <input type='reset' value={'취소'} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MatchForm