import React, { useState } from 'react';
import axios from 'axios';
import '../css/Bowling-Rating.css'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Bowling_Rating() {
  const location = useLocation()
  const { bowlingData } = location.state
  const nav = useNavigate()
  console.log('bowlingData', bowlingData);
  const [ratings, setRatings] = useState([
    { name: '볼링레인은 어떠셨나요?', value: 0 },
    { name: '볼링공의 상태나 신발은 만족하시나요?', value: 0 },
    { name: '화장실 및 부대시설은 깔끔했나요?', value: 0 },
    { name: '직원의 고객응대는 친절했나요?', value: 0 },

  ]);

  const memId = JSON.parse(sessionStorage.getItem('user'))[0].MEM_ID
  console.log('memId', memId);
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

  const ratingAxios = async (data) => {
    const result = (await axios.post('http://localhost:8888/DB/rating/insert', data)).data

    if (result) {
      Swal.fire({
        icon: 'success',
        title: '평점 작성',
        text: '평점 작성이 되었습니다.',
        showCancelButton: false,
        submitButton: '확인'
      }).then((res) => {

        nav('/bowlingAlley')
        // 평점 작성 성공
        console.log('userDate success');

      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '평점 작성',
        text: '평점 작성에 실패 하셨습니다.',
        showCancelButton: false,
        submitButton: '확인'
      }).then((res) => {
        // 평점 작성 실패
        console.log('failed');
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 평가 항목과 평점을 서버로 전송 또는 처리합니다.
    console.log('평가 항목들:', ratings);
    console.log('기타 코멘트:', comment);

    const data = {
      lane: ratings[0].value,
      ballShoes: ratings[1].value,
      facility: ratings[2].value,
      service: ratings[3].value,
      comment: comment,
      memId: memId,
      baSeq: bowlingData.BA_SEQ,
    };
    ratingAxios(data)

  };



  return (
    <div className="ratingstart">
      <h1>{bowlingData.BA_NAME} 평가</h1>
      <div className="rating">

      </div>



      {ratings.map((rating, index) => (
        <>


          <div key={index} className="ratingstar">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h3>{rating.name}</h3>
            {[1, 2, 3, 4, 5].map((value) => (
              <React.Fragment key={value}>
                <input
                  key={value}
                  type="checkbox"
                  id={`star${index + 1}-${value}`}
                  name={`rating${index + 1}-${value}`}
                  value={value}
                  checked={rating.value === value}
                  onChange={() => handleRatingChange(index, value)}
                />
                <label htmlFor={`star${index + 1}-${value}`}></label>
              </React.Fragment>
            ))}

          </div>
        </>
      ))}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="comment">
        <h3>하고싶은말을 자유롭게 적어주세요</h3>
        <textarea
          name="기타평가"
          rows="4"
          cols="100"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <br></br>
      <button className='ratingbutton' onClick={handleSubmit}>평가 제출</button>
    </div>
  );
}

export default Bowling_Rating;

