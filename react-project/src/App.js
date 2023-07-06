import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Join from './page/Join';
import Login from './page/Login';
import Main from './page/Main';
import Footer from './components/Footer';

function App(data) {
  return (
    <div>
      <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
      }}>
        <Header />

      </div>
      <div style={{height: '83.68230%'}}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/user/join' element={<Join element={data} />} />
          <Route path='/user/login' element={<Login />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
