import React, { useState, useEffect } from 'react';
import '../css/qna.css';
import '../css/styles.css';

const QnA = ({ isAuthenticated, user }) => {
  const [notices, setNotices] = useState([]);  // 초기 상태를 빈 배열로 설정
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [replyContent, setReplyContent] = useState({}); // 각 게시글의 답글 내용을 관리하는 상태
  const [faqOpen, setFaqOpen] = useState({}); // 자주 묻는 질문의 열림/닫힘 상태를 관리하는 상태

  useEffect(() => {
    const savedNotices = JSON.parse(localStorage.getItem('notices')) || [];
    // 각 notice 객체에 replies 배열이 있는지 확인
    const initializedNotices = savedNotices.map(notice => ({
      ...notice,
      replies: notice.replies || []
    }));
    setNotices(initializedNotices);
  }, []);

  const addNotice = () => {
    const newNotice = { id: Date.now(), title, content, date: new Date().toLocaleString(), author: user.id, replies: [] };
    const updatedNotices = [...notices, newNotice];
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
    setTitle('');
    setContent('');
  };

  const deleteNotice = (index) => {
    const updatedNotices = notices.filter((_, i) => i !== index);
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
  };

  const addReply = (noticeId) => {
    const newReply = { content: replyContent[noticeId], date: new Date().toLocaleString(), author: user.id }; // 답글을 작성하는 사용자의 ID를 저장합니다.
    const updatedNotices = notices.map((notice) => {
      if (notice.id === noticeId) {
        // replies 배열이 있는지 확인하고, 없으면 빈 배열로 초기화
        const updatedReplies = Array.isArray(notice.replies) ? [...notice.replies, newReply] : [newReply];
        return { ...notice, replies: updatedReplies };
      }
      return notice;
    });
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
    setReplyContent({ ...replyContent, [noticeId]: '' });
  };

  const toggleFaq = (index) => {
    setFaqOpen(prevFaqOpen => ({ ...prevFaqOpen, [index]: !prevFaqOpen[index] }));
  };

  return (
    <div className='QnAcontainer'>
      <h1>Q&A</h1>
      <div className="qna-content">
        {/* 자묻질 */}
        <span>"</span>
        <div className="faq">
          <h2>자주 묻는 질문</h2>
          <div className={`qnabox ${faqOpen[1] ? 'open' : ''}`}>
            <h3 onClick={() => toggleFaq(1)}>로그인이 실패했습니다</h3>
            <div className="faq-content">
            <p>국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다.</p>
            <p>의무교육은 무상으로 한다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.</p>
            </div>
          </div>
          <div className={`qnabox ${faqOpen[2] ? 'open' : ''}`}>
            <h3 onClick={() => toggleFaq(2)}>비밀번호를 잊어버렸습니다</h3>
            <div className="faq-content">
            <p>국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다.</p>
            <p>의무교육은 무상으로 한다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.</p>
            </div>
          </div>
          <div className={`qnabox ${faqOpen[3] ? 'open' : ''}`}>
            <h3 onClick={() => toggleFaq(3)}>회원 탈퇴는 어떻게 하나요?</h3>
            <div className="faq-content">
            <p>국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다.</p>
            <p>의무교육은 무상으로 한다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.</p>
            </div>
          </div>
          <div className={`qnabox ${faqOpen[4] ? 'open' : ''}`}>
            <h3 onClick={() => toggleFaq(4)}>음식점 검색이 안됩니다</h3>
            <div className="faq-content">
            <p>국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다.</p>
            <p>의무교육은 무상으로 한다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.</p>
            </div>
          </div>
          <div className={`qnabox ${faqOpen[5] ? 'open' : ''}`}>
            <h3 onClick={() => toggleFaq(5)}>이벤트 당첨 상품수령은 어떻게 하나요?</h3>
            <div className="faq-content">
            <p>국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다.</p>
            <p>의무교육은 무상으로 한다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.</p>
            </div>
          </div>
          <div className={`qnabox ${faqOpen[6] ? 'open' : ''}`}>
            <h3 onClick={() => toggleFaq(6)}>매실농장은 언제 폭파되나요?</h3>
            <div className="faq-content">
            <p>국가는 농지에 관하여 경자유전의 원칙이 달성될 수 있도록 노력하여야 하며, 농지의 소작제도는 금지된다. 군인은 현역을 면한 후가 아니면 국무위원으로 임명될 수 없다.</p>
            <p>의무교육은 무상으로 한다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 직접 질문하기 */}
      <div className='directContainer'>
        <span>"</span>
        {isAuthenticated ? (
          <div className='directAsk'>
            <h2>궁금한 점을 직접 물어보세요</h2>
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
            <button onClick={addNotice}>게시</button>
          </div>
        ) : (
          <p>로그인 후 질문을 작성할 수 있습니다.</p>
        )}
        {/* 직접 질문글 출력 */}
        <div>
          {notices && notices.map((notice, index) => (
            <div key={notice.id}>
              <h2>{notice.title}</h2>
              <p>{notice.content}</p>
              <p><small>{notice.date} - {notice.author}</small></p> {/* 작성자의 ID 출력 */}
              {isAuthenticated && ( // 로그인 상태에서만 답글을 작성할 수 있도록 설정
                <div className='directAskRe'>
                  <textarea
                    placeholder="답글"
                    value={replyContent[notice.id] || ''}
                    onChange={(e) => setReplyContent({ ...replyContent, [notice.id]: e.target.value })}
                  ></textarea>
                  <button onClick={() => addReply(notice.id)}>답글 달기</button>
                </div>
              )}
              <button onClick={() => deleteNotice(index)}>삭제</button>
              <div className="replies">
                {notice.replies && notice.replies.map((reply, idx) => (
                  <div key={idx} className="reply">
                    <p>{reply.content}</p>
                    <p><small>{reply.date} - {reply.author}</small></p> {/* 답글 작성자의 ID 출력 */}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QnA;