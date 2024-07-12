import React, { useState } from 'react';
import '../css/notice.css'; 

function Notice() {
  
  // 공지사항 리스트 (예제 데이터)
  const notices = [
    { id: 1, type: '이벤트', title: '서릿빛축제기념 2023 천살가게 방문인증 이벤트 만조의꿈', content: '서릿빛축제기념 2023 천살가게 방문인증 이벤트 만조의꿈 내용입니다.', date: '2023.11.30' },
    { id: 2, type: '당첨안내', title: '감자맛우유! 이벤트 당첨 안내', content: '감자맛우유! 이벤트 당첨 안내 내용입니다.', date: '2023.11.09' },
    { id: 3, type: '이벤트', title: '리뷰쓰고 선물받GO!', content: '리뷰쓰고 선물받GO! 내용입니다.', date: '2023.10.31' },
    { id: 4, type: '공지', title: '모르는 맛집이 없는 당신을 위한! 스트릿푸드파이터 이벤트', content: '모르는 맛집이 없는 당신을 위한! 스트릿푸드파이터 이벤트 내용입니다.', date: '2023.10.25' },
    { id: 5, type: '이벤트', title: '2023 천살가게 백년소공인 가보자고 이벤트 당첨자 발표', content: '2023 백년가게 백년소공인 가보자고 이벤트 당첨자 발표 내용입니다.', date: '2023.10.10' },
    { id: 6, type: '공지', title: '2023 천살가게 백년소공인 가보자고 이벤트', content: '2023 백년가게 백년소공인 가보자고 이벤트 내용입니다.', date: '2023.08.29' },
    { id: 7, type: '공지', title: '공지사항 제목 7', content: '공지사항 내용 7입니다.', date: '2023.08.28' },
    { id: 8, type: '공지', title: '공지사항 제목 8', content: '공지사항 내용 8입니다.', date: '2023.08.27' },
    { id: 9, type: '이벤트', title: '공지사항 제목 9', content: '공지사항 내용 9입니다.', date: '2023.08.26' },
    { id: 10, type: '공지', title: '공지사항 제목 10', content: '공지사항 내용 10입니다.', date: '2023.08.25' },
    { id: 11, type: '공지', title: '공지사항 제목 11', content: '공지사항 내용 11입니다.', date: '2023.08.24' },
    { id: 12, type: '공지', title: '공지사항 제목 12', content: '공지사항 내용 12입니다.', date: '2023.08.23' },
    { id: 13, type: '이벤트', title: '이벤트 제목', content: '공지사항 내용 13입니다.', date: '2023.08.22' },
    { id: 14, type: '공지', title: '공지사항 제목 14', content: '공지사항 내용 14입니다.', date: '2023.08.21' },
    { id: 15, type: '공지', title: '공지사항 제목 15', content: '공지사항 내용 15입니다.', date: '2023.08.20' },
    { id: 16, type: '이벤트', title: '공지사항 제목 16', content: '공지사항 내용 16입니다.', date: '2023.08.19' },
    { id: 17, type: '공지', title: '공지사항 제목 17', content: '공지사항 내용 17입니다.', date: '2023.08.18' },
    { id: 18, type: '당첨안내', title: '이벤트 당첨안내 제목', content: '이벤트 당첨안내 내용.', date: '2023.08.17' },
    { id: 19, type: '공지', title: '공지사항 제목 19', content: '공지사항 내용 19입니다.', date: '2023.08.16' },
    { id: 20, type: '이벤트', title: '이벤트 제목', content: '이벤트 내용.', date: '2023.08.15' },
    { id: 21, type: '공지', title: '공지사항 제목 21', content: '공지사항 내용 21입니다.', date: '2023.08.14' }
  ];

  // 상태 변수
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleContent, setVisibleContent] = useState({}); // 공지사항 내용 표시 상태
  const noticesPerPage = 10; // 페이지당 표시할 공지사항 수

  // 현재 페이지의 공지사항 필터링
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  // 페이지 번호 계산
  const totalPages = Math.ceil(notices.length / noticesPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 공지사항 내용 표시/숨기기 토글 함수
  const toggleContent = (id) => {
    setVisibleContent(prevVisibleContent => ({
      ...prevVisibleContent,
      [id]: !prevVisibleContent[id]
    }));
  };

  return (
    <div className="notice-container">
      <h1>공지사항</h1>
      <ul className="notice-list">
        {currentNotices.map(notice => (
          <li key={notice.id} className="notice-item">
            <span className="notice-type">{notice.type}</span>
            <span className="notice-title" onClick={() => toggleContent(notice.id)}>{notice.title}</span>
            <span className="notice-date">{notice.date}</span>
            {visibleContent[notice.id] && <p className="notice-content">{notice.content}</p>} {/* 공지사항 내용 */}
          </li>
        ))}
      </ul>
      <div className="notice-pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          &lt;
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Notice;
