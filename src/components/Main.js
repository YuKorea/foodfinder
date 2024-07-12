import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../store/MemberSlice";
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const info = useSelector(state => state.member.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('Main redux : ',info);
  const [id,setId] = useState('')
  const [name,setName] = useState('');
  useEffect(() =>{
    if(info.token == null){
      alert('로그인 정보가 없습니다. 로그인 해주세요');
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get('http://nam3324.synology.me:32845/member/info', {
          params :{ token : info.token}
        });
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          if(response.data.flag){
            alert('사용자 정보 읽기 완료');
            setId(response.data.id);
            setName(response.data.name);
          }
        }
      } catch (error) {
        alert('로그인 실패');
        console.error(error);
      }
    }
    fetchData();
  },[])

  const logout = () => {
    dispatch(clearToken());
    alert('로그아웃 처리되었습니다.');
    navigate("/login");
  }


  return (
    <div>
      <h2>로그인 한 사람 정보</h2>
      <p>아이디 : {id}</p>
      <p>이름 : {name}</p>
      <p>
        <button onClick={logout}>로그아웃</button>
      </p>
    </div>
  );
}
