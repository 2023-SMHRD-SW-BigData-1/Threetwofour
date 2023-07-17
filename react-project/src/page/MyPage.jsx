import React from 'react';
import '../css/MyPage.css';

const MyPage = () => {
  // 예시 데이터
  const profile = {
    profilePicture: 'https://m.bowlingmall.co.kr/web/product/big/20200121/b5d348df95894b22925f5f1c2e29e518.jpg',
    nickname: '324',
    bio: 'SPARE CITY를 이용해주셔서 감사합니다 회원님은 GOLD회원입니다',
  };

  const records = [
    { id: 1, date: '2023-07-01', score: 180, strikes: 7, spares: 3 },
    { id: 2, date: '2023-07-05', score: 210, strikes: 9, spares: 2 },
    { id: 3, date: '2023-07-10', score: 195, strikes: 6, spares: 4 },
  ];

  const matchRecords = [
    { id: 1, date: '2023-06-28', opponent: '요괴', score: '3-2' },
    { id: 2, date: '2023-07-02', opponent: '뿅뿅', score: '3-1' },
    
  ];

  return (
    <div className="mypage-container">
       <div className="header">
        <h1>마이페이지</h1>
        <button className="edit-profile-button">회원정보 수정</button>
      </div>
      <div className="profile-section">
      
        <h2>프로필</h2>
       <div className="profile-card">
        <img src={profile.profilePicture} alt="프로필 사진" className="profile-picture" />
        <h3 className="nickname">{profile.nickname}</h3>
        <p className="bio">{profile.bio}</p>
        </div>
      </div>

      
   
      <div className="records-section">
      <div className="header">
        <h2>기록</h2>
        <button className="edit-profile-button">점수 등록</button>
      </div>
        
        <table className="records-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>점수</th>
              <th>스트라이크 수</th>
              <th>스페어 수</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.score}</td>
                <td>{record.strikes}</td>
                <td>{record.spares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
      <div className="data-section">
      <div className="match-records-section">
        <h2>매치 기록</h2>
        <ul className="match-records-list">
          {matchRecords.map((match) => (
            <li key={match.id}>
              <p>날짜: {match.date}</p>
              <p>상대방: {match.opponent}</p>
              <p>스코어: {match.score}</p>
            </li>
            
          ))}
        </ul>
        </div>
      
      <div className="match-requests-section">
        <h2>매칭신청 현황</h2>
        <ul className="match-requests-list">
        <li>
      <h3>매칭신청 1</h3>
      <p>상대방: 병든애</p>
      <p>날짜: 2023-07-15</p>
    </li>
    <li>
      <h3>매칭신청 2</h3>
      <p>상대방: 상거지</p>
      <p>날짜: 2023-07-16</p>
    </li>
    
        </ul>
      </div>
      </div>


    </div>
  );
};

export default MyPage;
