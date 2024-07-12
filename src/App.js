import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import FileRead from './components/FileRead';
import AddressSearch from './components/AddressSearch';
import KakaoMap from './components/KakaoMap';
import Filter from './components/Filter';
import Notice from './components/Notice';
import QnA from './components/QnA';
import Introduction from './components/Introduction';
import Guide from './components/Guide';
import RestaurantDetails from './components/RestaurantDetails';
import './css/styles.css';
import Reviews from './components/Reviews';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [data, setData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : { id: '', name: '' };
  });
  const navigate = useNavigate();

  const handleTypeChange = (newSelectedTypes) => {
    setSelectedTypes(newSelectedTypes);
  };

  const handleReset = () => {
    setSelectedAddress(null);
  };

  const handleLogin = (userInfo) => {
    setIsAuthenticated(true);
    setUser(userInfo);
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ id: '', name: '' });
  };

  const foodmenuClick = function(event) {
    const li = event.currentTarget;
    const target = event.target;

    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      return;
    }

    if (!li.classList.contains('clicked')) {
      li.style.height = '100px';
      li.classList.add('clicked');
    } else {
      li.style.height = '';
      li.classList.remove('clicked');
    }
  };

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/notice">공지사항</Link></li>
          <a className='header' href='http://localhost:3000/'>Header</a>
          <li><Link to="/qna">QnA</Link></li>
          <li><Link to="/reviews">후기</Link></li>
        </ul>
        <div id='loginPage'>
          {isAuthenticated ? (
            <div>
              <h2>로그인 한 사람 정보</h2>
              <p>아이디 : {user.id}</p>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </nav>

      <div id='color'>
        <div className="container">
          <Routes>
            <Route path="/" element={
              <div className="App">
                {location.pathname === '/' && (
                  <div id='foodmenu'>
                    <span onClick={foodmenuClick} id='category'>category</span>
                    <Filter selectedTypes={selectedTypes} onTypeChange={handleTypeChange} />
                    <AddressSearch initialAddress={selectedAddress} onAddressSelect={setSelectedAddress} onCancel={handleReset} />
                  </div>
                )}
                <div className="main-content">
                  <div className="form-container">
                    <FileRead onDataLoad={setData} />
                  </div>
                  <div className="map-container">
                    <KakaoMap
                      data={data}
                      selectedAddress={selectedAddress}
                      selectedTypes={selectedTypes}
                      onReset={handleReset}
                    />
                  </div>
                </div>
              </div>
            } />
            <Route path="/notice" element={<Notice />} />
            <Route path="/qna" element={<QnA isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails data={data} />} />
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;