import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../css/login.css'; // CSS 파일 임포트

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/login', { id: id, pwd: password });
      if (response.status === 200) {
        if (response.data.flag) {
          alert('로그인 성공');
          onLogin({ id: id, name: response.data.name });
          navigate('/');
        } else {
          alert('로그인 실패');
        }
      }
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // '/register' 경로로 이동
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인 페이지</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="login-input"
        />
        <br />
        <input
          type="password"
          placeholder="암호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <br />
        <div className="button-container">
          <button type="submit" className="login-button">로그인</button>
          <button type="button" onClick={handleRegister} className="register-button">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default Login;