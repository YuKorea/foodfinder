import React, { useState, useEffect } from 'react';
import '../css/review.css'; // Review 관련 CSS 파일 불러오기

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [replyContent, setReplyContent] = useState({});
  const [faqOpen, setFaqOpen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    // 임의로 작성된 리뷰 추가
    const initialReviews = [
      {
        id: Date.now(),
        title: '맛집추천',
        content: '당산역에 맛집발견',
        date: '2024-06-10',
        author: 'kh수강생',
        replies: []
      },
      {
        id: Date.now() + 1, // id가 겹치지 않도록 함
        title: '정말 맛있다',
        content: '여기 강력추천',
        date: '2024-06-12',
        author: '여행자',
        replies: []
      },
      {
        id: Date.now() + 2, // id가 겹치지 않도록 함
        title: '감사합니다',
        content: '도움 감사합니다.',
        date: '2024-06-12',
        author: '야도란',
        replies: []
      },
      {
        id: Date.now() + 3,
        title: '추천합니다',
        content: '서비스가 훌륭해요.',
        date: '2024-06-13',
        author: '방문객',
        replies: []
      },
      {
        id: Date.now() + 4,
        title: '아쉬웠어요',
        content: '기대 이하였습니다.',
        date: '2024-06-14',
        author: '고객',
        replies: []
      }
    ];
    setReviews(initialReviews);
  }, []);

  const addReview = () => {
    const newReview = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleString(),
      author: '낯선이', // 추가된 리뷰에 대한 임의 작성자
      replies: []
    };
    setReviews([...reviews, newReview]);
    setTitle('');
    setContent('');
  };

  const deleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const addReply = (reviewId) => {
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        const newReply = {
          content: replyContent[reviewId],
          date: new Date().toLocaleString()
        };
        return {
          ...review,
          replies: [...review.replies, newReply]
        };
      }
      return review;
    });
    setReviews(updatedReviews);
    setReplyContent({ ...replyContent, [reviewId]: '' });
  };

  const toggleFaq = (id) => {
    setFaqOpen({ ...faqOpen, [id]: !faqOpen[id] });
  };

  // 페이지네이션 관련 변수
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='reviewContainer'>
      <div className='writeReview'>
        <h2>리뷰/후기 작성</h2>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={addReview}>게시</button>
      </div>

      {/* 최근 등록된 리뷰 */}
      <div className="recentReview">
        <h2>최근 리뷰</h2>
        {currentReviews.map((review, index) => (
          <div key={index} className={`reviewbox ${faqOpen[review.id] ? 'open' : ''}`}>
            <h3 onClick={() => toggleFaq(review.id)}>{review.title}</h3>
            <div className="reBox-content">
              <p>{review.content}</p>
              <p><small>{review.date} , 작성자 {review.author}</small></p>
              <button className="review-delete-btn" onClick={() => deleteReview(review.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      <div className="review-pagination">
        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
