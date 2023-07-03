import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom'
import Main from './page/Main';
import Join from './page/Join';
import Login from './page/Login';

function App(data) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/main' element={<Main />} />
        <Route path='/user/join' element={<Join element={data}/>} />
        <Route path='/user/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
