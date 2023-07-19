import React, { useEffect, useRef, useState } from 'react'
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

        mem_proposer: '', // sessionStorge('user')
        mem_acceptor: '', //=> 이전페이지 -> 회원클릭 -> 그 회원정보 => 어떻게 넘기고 받아올 건가
        matchDate: '', // -> 매칭 신청 날짜 ; sysdate
        match_At: '', // -> 어디에 저장하지? -> 신청 받은 사람이 수락했을 때 저장할 수 있게
        mem_part: '', // 팀or개인 -> 변수에 담아서 데이터 넘기기
        lane_seq: '', // -> 어느 볼링장에서 할 거야?

        // gameMode: ''
        // mem_proposer : '',
        // mem_acceptor : '',
        // startDate: '',

    })

    const lane_seqRef = useRef();
    const bow_allRef = useRef();
    const mem_partRef = useRef();
    const gameModeRef = useRef();
    const dayRef = useRef();
    const timeRef = useRef();
    const betRef = useRef();
    const [teamValid, setTeamValid] = useState(false)

    const [select, setSelect] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const nav = useNavigate()
    const userInfo = JSON.parse(sessionStorage.getItem('user'))[0]

    const selecOptionhandler = (e) => {
        setSelect(e.target.value);

        if (mem_partRef.current.value === 'team') { setTeamValid(true) }
        else { setTeamValid(false) }
    }

    const handleData = () => {


        let dateList = String(dayRef.current.input.value).split(' ')

        let year = (dateList[0].replace('년',''))
        let month = (dateList[1].replace('월',''))
        let day = (dateList[2].replace('일', ''))

        let timeList = String(timeRef.current.input.value).split(' ')
        let hour = ''
        if (timeList[0] == 'PM') {
            hour = parseInt(timeList[1].replace('시','')) + 12
        } else {
            hour = (timeList[1].replace('시',''))
        }
        let minite = (timeList[2].replace('분',''))

        

        setUserDate({
            mem_proposer: userInfo,
            mem_acceptor: 10,
            matchDate: startDate, // 시간
            match_At: `${year}-${month}-${day} ${hour}: ${minite}:00`, // 시간
            mem_part: mem_partRef.current.value, // 회원유형(팀, 개인)
            lane_seq: lane_seqRef.current.value, // 레인 고유번호
            gameMode: 'gameModeRef.current.value' // 게임 모드
        })


        // console.log(new Date(dayRef.current.input.value,timeRef.current.input.value));
    }



    useEffect(() => {

        let dateList = String(dayRef.current.input.value).split(' ')

        let year = (dateList[0].replace('년',''))
        let month = (dateList[1].replace('월',''))
        let day = (dateList[2].replace('일',''))

        let timeList = String(timeRef.current.input.value).split(' ')
        let hour = ''
        if (timeList[0] == 'PM') {
            hour = parseInt(timeList[1].replace('시','')) + 12
        } else {
            hour = (timeList[1].replace('시',''))
        }
        let minite = (timeList[2].replace('분',''))

        setUserDate({
            mem_proposer: userInfo,
            mem_acceptor: 10,
            matchDate: startDate, // 시간
            match_At: `${year}-${month}-${day} ${hour}:${minite}:00`, // 시간
            mem_part: mem_partRef.current.value, // 회원유형(팀, 개인)
            lane_seq: lane_seqRef.current.value, // 레인 고유번호
            gameMode: 'gameModeRef.current.value' // 게임 모드
        })
    }, [startDate])



    useEffect(() => {
        console.log('useEffect userData', userData);
    }, [userData])



    const submitButton = (e) => {

        e.preventDefault()

        let dateList = String(dayRef.current.input.value).split(' ')

        let year = (dateList[0].replace('년',''))
        let month = (dateList[1].replace('월',''))
        let day = (dateList[2].replace('일',''))


        let timeList = String(timeRef.current.input.value).split(' ')
        let hour = ''
        if (timeList[0] == 'PM') {
            hour = parseInt(timeList[1].replace('시','')) + 12
        } else {
            hour = (timeList[1].replace('시',''))
        }
        let minite = (timeList[2].replace('분',''))

        setUserDate({
            mem_proposer: userInfo,
            mem_acceptor: 10,
            matchDate: startDate, // 시간
            match_At: `${year}-${month}-${day} ${hour}:${minite}:00`, // 시간
            mem_part: mem_partRef.current.value, // 회원유형(팀, 개인)
            lane_seq: lane_seqRef.current.value, // 레인 고유번호
            gameMode: 'gameModeRef.current.value' // 게임 모드
        })

        console.log('userDate',userData);
        axios.post('http://localhost:8888/DB/match/insert', { userData: userData })
            .then((res) => {
                if (res.data) {
                    Swal.fire({
                        icon: 'success',
                        title: '매칭 신청',
                        text: '매칭 신청이 되었습니다.',
                        showCancelButton: false,
                        submitButton: '확인'
                    }).then((res) => {

                        // sessionStorage.setItem('user')
                        sessionStorage.getItem('user')
                        nav('/')
                        // 매칭 신청 성공
                        console.log('userDate success');

                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '매칭 신청',
                        text: '매칭 신청에 실패 하셨습니다.',
                        showCancelButton: false,
                        submitButton: '확인'
                    }).then((res) => {
                        // 매칭 신청 실패
                        console.log('failed');
                    })
                }
            })
            .catch((err) => { console.error('Faied to matchApplication', err) })
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
                            text={['지역 볼링장']}
                            ref={lane_seqRef}
                            type={'text'}
                            placeholder={'경기하고 싶은 볼링장명을 기입해주세요.'}
                            handleData={handleData}
                            data={userData.lane_seq}
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
                                ref={dayRef}
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
                                ref={timeRef}
                            />
                        </div>
                    </div>

                    {/* <div className='form-group gamemode'>
                        친선모드 / 경쟁모드
                        <select
                            onChange={handleData}
                            ref={gameModeRef}>
                            <option value="">모드를 선택하세요</option>
                            <option value="friendlyMode">친선모드</option>
                            <option value="competitionMode">경쟁모드</option>
                        </select>
                    </div>
                    <div className='form-group bet'>
                         내기모드 선택
                        <select
                            onChange={handleData}
                            ref={betRef}>
                            <option value="">내기를 하시겠습니까?</option>
                            <option value="friendlyMode">내기 O</option>
                            <option value="competitionMode">내기 X</option>
                        </select>
                    </div> */}

                    <div className='form-group personnel'>
                        개인, 팀
                        <select
                            id='personnel'
                            onChange={selecOptionhandler}
                            ref={mem_partRef}>
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