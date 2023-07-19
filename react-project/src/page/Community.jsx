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

  const borderAxios = async () => {
    const result = await axios.get('http://localhost:8888/DB/community/')
    console.log(result.data);
    let garaData = result.data

    let garaDataList = []

    for (let i = 0; i < garaData.length; i += size) {
      garaDataList.push(garaData.slice(i, i + size))
    }

    setData(garaDataList)
  }

  useEffect(() => {

    borderAxios()

  }, [])

  let num = 1;

  let numList = [];

  useEffect(() => {


    data.map(item => numList.push(num++))

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