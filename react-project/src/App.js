import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Join from './page/Join';
import Login from './page/Login';
import Main from './page/Main';

function App(data) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center'
    }}>
      <Header />
      <div style={{
        width: 'auto'
      }}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/user/join' element={<Join element={data} />} />
          <Route path='/user/login' element={<Login />} />
      </Routes>

      </div>
    </div>
  );
}

export default App;
