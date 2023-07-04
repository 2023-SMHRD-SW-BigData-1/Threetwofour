import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {

  const idRef = useRef(); 
  const pwRef = useRef();

  const [userData, setUserData] = useState({}) // id, pw 같이 넣어줄거니까 객체값으로 쓸거야

  const handleLogin = (e)=>{
    e.preventDefault(); // 너 다른 곳으로 이동 못하게 막을거야
    console.log(idRef.current.value, pwRef.current.value)
    setUserData({
      id : idRef.current.value,
      pw : pwRef.current.value
    })
  }
  
  useEffect(()=>{
    userData.id !== undefined &&
    axios.post('http://localhost:8888/user/login', {userData : userData}) // userData를 userData 객체로 보내줄게요
    .then((res)=>{
      console.log(res.data.result)
      if(res.data.result == 'success'){
        alert(res.data.id + '님 환영합니다!')

        // 브라우저 세션 저장소에 데이터가 저장
        // => 브라우저를 껐다 키면 사라지는 반휘발성 데이터
        sessionStorage.setItem('id', res.data.id) // res -> result야

        // 나중을 위해! 세션에 있는 데이터 가져오기 
        sessionStorage.getItem('id')

      }
    })
    
  },[userData]) // userData가 업데이트 됐을 때 useEffect를 실행시켜줄게

  return ( 
    <div className='main-box info-box'>
    <Form onSubmit={handleLogin}>
      
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Id" ref={idRef}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={pwRef}/>
        </Form.Group>
      

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  
  )
}

export default Login