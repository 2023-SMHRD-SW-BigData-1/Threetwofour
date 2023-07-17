import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Join from './page/Join';
import Login from './page/Login';
import Main from './page/Main';
import Footer from './components/Footer';
import Logout from './page/Logout';
import KakaoData from './components/Join/KakaoLogin/KakaoData';
import ClubMain from './components/Club/ClubMain';
import Community from './page/Community';

function App(data) {
  return (
    <div style={{width:'100rem'}}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Header />

      </div>
      <div style={{ height: '87%' }}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/user/join' element={<Join element={data} />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/logout' element={<Logout />} />
          <Route path='/oauth/callback/kakao' element={<KakaoData />} />
          <Route exact path='/clubList/*' element={<ClubMain /> } />
          <Route exact path='/community/*' element={<Community /> } />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
