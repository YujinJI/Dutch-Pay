import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = props => {
  const { logInWithEmail, logInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleLogIn = () => {
    logInWithEmail(email, password);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="card w-96 m-auto px-3 shadow-sm bg-white">
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl font-extrabold mb-4">로그인</h2>
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            className="input input-bordered w-full max-w-xs text-sm"
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            className="input input-bordered w-full max-w-xs text-sm"
            onChange={handlePasswordChange}
          />
          <div className="card-actions w-full">
            <button className="btn bg-slate-700 hover:bg-slate-600 text-white w-full" onClick={handleLogIn}>
              로그인
            </button>
          </div>
          <p className="m-auto text-sm py-2">다른 방법으로 로그인</p>
          <button
            className="btn bg-white hover:bg-gray-50 input-bordered text-center font-normal relative"
            onClick={logInWithGoogle}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png"
              className="absolute top-1/2 left-3 transform -translate-y-1/2 w-7 h-7.5"
            />
            구글로 로그인
          </button>
          <Link to="/signup" className="link text-sm text-center py-2">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
