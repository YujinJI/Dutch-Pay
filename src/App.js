import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import React, { useContext } from 'react';
import AuthContext from './context/AuthContext';
import SearchRoom from './components/SearchRoom';
import Room from './components/Room';

function App() {
  const { user, isLoggedIn } = useContext(AuthContext);
  console.log('현재 로그인 상태', isLoggedIn);
  return (
    <BrowserRouter>
      <div className="App w-screen h-screen bg-gray-50">
        <Header />
        <Routes>
          {isLoggedIn ? <Route path="/" element={<SearchRoom />} /> : <Route path="/" element={<Login />} />}
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          <Route path="/rooms/:randomString" element={<Room />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
