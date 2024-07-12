import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/register.css'; // CSS 파일 임포트

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneFirst, setPhoneFirst] = useState('');
  const [phoneSecond, setPhoneSecond] = useState('');
  const [phoneThird, setPhoneThird] = useState('');
  const [userNick, setUserNick] = useState('');
  const [emailLocalPart, setEmailLocalPart] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [customEmailDomain, setCustomEmailDomain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e, setter) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('암호가 일치하지 않습니다');
      return;
    }
    const email = `${emailLocalPart}@${emailDomain || customEmailDomain}`;
    try {
      const response = await axios.post('http://nam3324.synology.me:32845/member/register', {
        userID: id,
        userName: userName,
        userPassword: password,
        userEmail: email,
        userPhone: `${phoneFirst}-${phoneSecond}-${phoneThird}`,
        userNickName: userNick,
        userGender: gender
      });
      alert('회원가입 성공');
      navigate('/login');
    } catch (error) {
      alert('회원 가입 실패');
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">회원가입</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="register-input"
        />
        <br/>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="암호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <img
            src={showPassword ? '/images/close_eyes.png' : '/images/open_eyes.png'}
            alt="Toggle Password Visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-password-visibility"
          />
        </div>
        <br />
        <div className="password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="암호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="register-input"
          />
          <img
            src={showConfirmPassword ? '/images/close_eyes.png' : '/images/open_eyes.png'}
            alt="Toggle Password Visibility"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="toggle-password-visibility"
          />
        </div>
        <br />
        <input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="register-input"
        />
        <br />
        <input
          type="text"
          placeholder="닉네임"
          value={userNick}
          onChange={(e) => setUserNick(e.target.value)}
          required
          className="register-input"
        />
        <br />
        <div className="email-input-container">
          <input
            type="text"
            placeholder="이메일"
            value={emailLocalPart}
            onChange={(e) => setEmailLocalPart(e.target.value)}
            required
            className="register-input"
          />
          <span>@</span>
          <select
            value={emailDomain}
            onChange={(e) => {
              setEmailDomain(e.target.value);
              setCustomEmailDomain('');
            }}
            className="register-input"
            required
          >
            <option value="" disabled>
              선택
            </option>
            <option value="naver.com">naver.com</option>
            <option value="google.com">google.com</option>
            <option value="daum.net">daum.net</option>
            <option value="nate.com">nate.com</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="outlook.com">outlook.com</option>
            <option value="icloud.com">icloud.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="kakao.com">kakao.com</option>
            <option value="">직접 입력</option>
          </select>
          {emailDomain === '' && (
            <input
              type="text"
              placeholder="직접 입력"
              value={customEmailDomain}
              onChange={(e) => setCustomEmailDomain(e.target.value)}
              className="register-input"
              required
            />
          )}
        </div>
        <br />
        <div className="phone-input-container">
        <input
  type="text"
  value="010"
  disabled
  className="phone-input"
/>
{' - '}
<input
  type="text"
  placeholder="0000"
  value={phoneSecond}
  onChange={(e) => handlePhoneChange(e, setPhoneSecond)}
  maxLength="4"
  className="phone-input"
/>
{' - '}
<input
  type="text"
  placeholder="0000"
  value={phoneThird}
  onChange={(e) => handlePhoneChange(e, setPhoneThird)}
  maxLength="4"
  className="phone-input"
/>
        </div>
        <br />    
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="register-input"
        >
          <option value="" disabled>
            성별 선택
          </option>
          <option value="M">남자</option>
          <option value="F">여자</option>
        </select>
        <br />
        <button type="submit" className="register-button">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Register;
