import React, { useState } from 'react';
import './App.css';
import axios from 'axios';



function App() {
  const [ratings, setRatings] = useState([
    { name: '?볼링레인은 어떠셨나요', value: 0 },
    { name: '?볼링공의 상태나 신발은 만족하시나요', value: 0 },
    { name: '?화장실 및 부대시설은 깔끔했나요', value: 0 },
    { name: '?직원의 고객응대는 친절했나요', value: 0 },
    
  ]);
  const [comment, setComment] = useState('');

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index].value = value;
    setRatings(updatedRatings);
  };

  const handleCommentChange = (event) => {
    const comment = event.target.value;
    setComment(comment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 평가 항목과 평점을 서버로 전송 또는 처리합니다.
    console.log('평가 항목들:', ratings);
    console.log('기타 코멘트:', comment);

    const data = {
      ratings: ratings,
      lane: ratings[0],
      ballShoes: ratings[1],
      facility: ratings[2],
      service: ratings[3],
      comment: comment,
    };
    axios.post('http://localhost:8888/api/ratings', data)
  .then(response => {
    // 서버 응답 처리
    console.log(response.data.message);
  })
  .catch(error => {
    // 에러 처리
    console.error(error);
  });

  };


  
  return (
    <div className="App">
      <h1>볼링장 평가</h1>
      <div className="rating">
    
      </div>
      <br></br>
      <br></br>

      {ratings.map((rating, index) => (
        <div key={index} className="rating">
           <p>{rating.name}</p>
          {[5,4,3,2,1].map((value) => (
            <React.Fragment key={value}>
              <input
                type="radio"
                id={`star${index + 1}-${value}`}
                name={`rating${index + 1}`}
                value={value}
                checked={rating.value === value}
                onChange={() => handleRatingChange(index, value)}
              />
              <label htmlFor={`star${index + 1}-${value}`}></label>
            </React.Fragment>
          ))}
         
        </div>
      ))}
      <div className="comment">
        <h4>하고싶은말을 자유롭게 적어주세요</h4>
        <textarea
          name="기타평가"
          rows="4"
          cols="100"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <br></br>
      <button onClick={handleSubmit}>평가 제출</button>
    </div>
  );
}

export default App;

