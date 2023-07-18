import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import CommunityList from '../components/Community/CommunityList'
import View from '../components/Community/View'
import Write from '../components/Community/Write'
import Edit from '../components/Community/Edit'
import axios from 'axios'

const Community = () => {


  const [pageNo, setPageNo] = useState([])

  const [data, setData] = useState([[]])

  const [size, setSize] = useState(10)


  useEffect(() => {

    let garaData = [
      { num: 1, writer: '조서연', date: new Date().toLocaleDateString(), count: 20, content: '궁금합니다. 알려주세요~', title: '블랙위도우 하드볼 화이트 색상 이제 안 나오나요?' },
      { num: 2, writer: '오승원', date: new Date().toLocaleDateString(), count: 20, content: '반갑습니다', title: '중고볼 문의합니다' },
      { num: 3, writer: '홍경표', date: new Date().toLocaleDateString(), count: 20, content: '초보 투핸드 볼러입니다. 보유한 공이 다 쎈 볼인데 요즘 레인 상태가 좋지 않은 곳에서 치는 일이 많다 보니 앤트리급 볼링공을 애타게 찾게 되네요. 미드나 앤트리 볼링공 추천해주시면 정말 감사하겠습니다!', title: '마른레인 볼링공 질문있습니다!' },
      { num: 4, writer: '박지원', date: new Date().toLocaleDateString(), count: 20, content: '클래식 초보 아대볼링인데, 어떤게 좋나요?', title: '초보 아대 추천해주세용' },
      { num: 5, writer: '남건일', date: new Date().toLocaleDateString(), count: 20, content: '볼링치다가 하드볼이 깨졌는데 어떻게 버리죠?', title: '하드볼 어떻게 버리나요?' },
      { num: 6, writer: '양동하', date: new Date().toLocaleDateString(), count: 20, content: '현재 하우스볼로 130치는데 마이볼에 관심이 생겼서 문의글 남깁니다. 추천해주세요!', title: '볼린이입니다' },
      { num: 7, writer: '박희주', date: new Date().toLocaleDateString(), count: 20, content: '중고볼링공까지 해서 하이볼급이 3개 있는데, 공 보관은 어떻게 하시나요?', title: '볼링공 질문' },
      { num: 8, writer: '정윤지', date: new Date().toLocaleDateString(), count: 20, content: '볼링화를 선물하고 싶은데, 어느 브랜드가 좋은지 추천 부탁드립니다.', title: '볼링화 문의합니다' },
      { num: 9, writer: '이준', date: new Date().toLocaleDateString(), count: 20, content: '투핸드로 치고 있는 볼린이입니다. 백스윙할 때 팔꿈ㅁ치가 굽혀지지 않아서 고민입니다. ', title: '투핸드 백스윙 고민' },
      { num: 10, writer: '정준옥', date: new Date().toLocaleDateString(), count: 20, content: '학생입니다. 초보 덤리스 공 추천 부탁드려요.', title: '초보 덤리스 공 추천' },
      { num: 11, writer: '이수호', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 11', title: '제목 11' },
      { num: 12, writer: '정병인', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 12', title: '제목 12' },
      { num: 13, writer: '김민준', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 13', title: '제목 13' },
      { num: 14, writer: '진학성', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 14', title: '제목 14' },
      { num: 15, writer: '장환익', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 15', title: '제목 15' },
      { num: 16, writer: '김하진', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 16', title: '제목 16' },
      { num: 17, writer: '김다은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 17', title: '제목 17' },
      { num: 18, writer: '박충희', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 18', title: '제목 18' },
      { num: 19, writer: '김태경', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 19', title: '제목 19' },
      { num: 20, writer: '조수민', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 20', title: '제목 20' },
      { num: 21, writer: '김호현', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 21', title: '제목 21' },
      { num: 22, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 22', title: '제목 22' },
      { num: 23, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 23', title: '제목 23' },
      { num: 24, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 24', title: '제목 24' },
      { num: 25, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 25', title: '제목 25' },
      { num: 26, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 26', title: '제목 26' },
      { num: 27, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 27', title: '제목 27' },
      { num: 28, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 28', title: '제목 28' },
      { num: 29, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 29', title: '제목 29' },
      { num: 30, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 30', title: '제목 30' },
      { num: 31, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 31', title: '제목 31' },
      { num: 32, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 32', title: '제목 32' },
      { num: 33, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 33', title: '제목 33' },
      { num: 34, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 34', title: '제목 34' },
      { num: 35, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 35', title: '제목 35' },
      { num: 36, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 36', title: '제목 36' },
      { num: 37, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 37', title: '제목 37' },
      { num: 38, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 38', title: '제목 38' },
      { num: 39, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 39', title: '제목 39' },
      { num: 40, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 40', title: '제목 40' },
      { num: 41, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 41', title: '제목 41' },
      { num: 42, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 42', title: '제목 42' },
      { num: 43, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 43', title: '제목 43' },
      { num: 44, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 44', title: '제목 44' },
      { num: 45, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 45', title: '제목 45' },
      { num: 46, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 46', title: '제목 46' },
      { num: 47, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 47', title: '제목 47' },
      { num: 48, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 48', title: '제목 48' },
      { num: 49, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 49', title: '제목 49' },
      { num: 50, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 50', title: '제목 50' },
      { num: 51, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 51', title: '제목 51' },
      { num: 52, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 52', title: '제목 52' },
      { num: 53, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 53', title: '제목 53' },
      { num: 54, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 54', title: '제목 54' },
      { num: 55, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 55', title: '제목 55' },
      { num: 56, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 56', title: '제목 56' },
      { num: 57, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 57', title: '제목 57' },
      { num: 58, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 58', title: '제목 58' },
      { num: 59, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 59', title: '제목 59' },
      { num: 60, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 60', title: '제목 60' },
      { num: 61, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 61', title: '제목 61' },
      { num: 62, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 62', title: '제목 62' },
      { num: 63, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 63', title: '제목 63' },
      { num: 64, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 64', title: '제목 64' },
      { num: 65, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 65', title: '제목 65' },
      { num: 66, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 66', title: '제목 66' },
      { num: 67, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 67', title: '제목 67' },
      { num: 68, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 68', title: '제목 68' },
      { num: 69, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 69', title: '제목 69' },
      { num: 70, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 70', title: '제목 70' },
      { num: 71, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 71', title: '제목 71' },
      { num: 72, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 72', title: '제목 72' },
      { num: 73, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 73', title: '제목 73' },
      { num: 74, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 74', title: '제목 74' },
      { num: 75, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 75', title: '제목 75' },
      { num: 76, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 76', title: '제목 76' },
      { num: 77, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 77', title: '제목 77' },
      { num: 78, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 78', title: '제목 78' },
      { num: 79, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 79', title: '제목 79' },
      { num: 80, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 80', title: '제목 80' },
      { num: 81, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 81', title: '제목 81' },
      { num: 82, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 82', title: '제목 82' },
      { num: 83, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 83', title: '제목 83' },
      { num: 84, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 84', title: '제목 84' },
      { num: 85, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 85', title: '제목 85' },
      { num: 86, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 86', title: '제목 86' },
      { num: 87, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 87', title: '제목 87' },
      { num: 88, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 88', title: '제목 88' },
      { num: 89, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 89', title: '제목 89' },
      { num: 90, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 90', title: '제목 90' },
      { num: 91, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 91', title: '제목 91' },
      { num: 92, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 92', title: '제목 92' },
      { num: 93, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 93', title: '제목 93' },
      { num: 94, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 94', title: '제목 94' },
      { num: 95, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 95', title: '제목 95' },
      { num: 96, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 96', title: '제목 96' },
      { num: 97, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 97', title: '제목 97' },
      { num: 98, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 98', title: '제목 98' },
      { num: 99, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 99', title: '제목 99' },
      { num: 100, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 100', title: '제목 100' },
      { num: 101, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 101', title: '제목 101' },
      { num: 102, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 102', title: '제목 102' },
      { num: 103, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 103', title: '제목 103' },
      { num: 104, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 104', title: '제목 104' },
      { num: 105, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 105', title: '제목 105' },
      { num: 106, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 106', title: '제목 106' },
      { num: 107, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 107', title: '제목 107' },
      { num: 108, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 108', title: '제목 108' },
      { num: 109, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 109', title: '제목 109' },
      { num: 110, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 110', title: '제목 110' },
      { num: 111, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 111', title: '제목 111' },
      { num: 112, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 112', title: '제목 112' },
      { num: 113, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 113', title: '제목 113' },
      { num: 114, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 114', title: '제목 114' },
      { num: 115, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 115', title: '제목 115' },
      { num: 116, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 116', title: '제목 116' },
      { num: 117, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 117', title: '제목 117' },
      { num: 118, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 118', title: '제목 118' },
      { num: 119, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 119', title: '제목 119' },
      { num: 120, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 120', title: '제목 120' },
      { num: 121, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 121', title: '제목 121' },
      { num: 122, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 122', title: '제목 122' },
      { num: 123, writer: '박예은', date: new Date().toLocaleDateString(), count: 20, content: '테스트 내용 123', title: '제목 123' },
    ]

    const borderAxios = async () => {
      const result = await axios.get('http://localhost:8888/DB/community/')
      console.log(result.data);
    }

    let garaDataList = []

    for (let i = 0; i < garaData.length; i += size) {
      garaDataList.push(garaData.slice(i, i + size))
    }

    setData(garaDataList)
    borderAxios()


  }, [])

  let num = 1;

  let numList = [];

  useEffect(() => {


    data.map(item=>numList.push(num++))

    setPageNo(numList)

  }, [data])





  return (
    <>

      <Routes>
        <Route path='/*' element={<CommunityList data={data} pageNo={pageNo} setData={setData} setPageNo={setPageNo} />} />
        <Route path='/view/:num' element={<View />} />
        <Route path='/write/' element={<Write />} />
        <Route path='/edit/:num' element={<Edit />} />

      </Routes>




    </>
  )
}

export default Community