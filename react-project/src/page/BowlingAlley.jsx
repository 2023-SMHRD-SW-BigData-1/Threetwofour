import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BowlingTable = () => {

    const { addr } = useParams()
    const nav = useNavigate()

    console.log(addr);
    const regions = [
        { name: '서울', size: 'large' },
        { name: '인천', size: 'medium' },
        { name: '경기', size: 'large' },
        { name: '강원', size: 'small' },
        { name: '대전', size: 'small' },
        { name: '충남', size: 'medium' },
        { name: '충북', size: 'small' },
        { name: '대구', size: 'medium' },
        { name: '경북', size: 'medium' },
        { name: '경남', size: 'medium' },
        { name: '울산', size: 'small' },
        { name: '부산', size: 'large' },
        { name: '광주', size: 'small' },
        { name: '전북', size: 'small' },
        { name: '전남', size: 'small' },
        { name: '제주', size: 'small' },
    ];

    const [list, setList] = useState([])
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [bowlingData, setBowlingData] = useState([]);

    useEffect(() => {
        const fetchBowlingData = async () => {
            const response = (await axios.get('http://localhost:8888/DB/bowlingAlley/bowling')).data; // 볼링장 정보를 가져오는 API 엔드포인트로 요청합니다.

            await setBowlingData(response);

        };

        fetchBowlingData();

        console.log('bowlingData', bowlingData);
    }, []);


    useEffect(() => {

        setList([])
        console.log('response', bowlingData);

        console.log('filter', bowlingData.filter(item => item.BA_ADDR.includes(addr)))


        setList(bowlingData.filter(item => item.BA_ADDR.includes(addr || '서울')))

        console.log(list[selectedRegion]);
        console.log(selectedRegion);

    }, [addr, bowlingData])

    const handleRegionClick = (regionName) => {
        setSelectedRegion(regionName);
    };



    const getTableSize = (regionName) => {
        const sizes = {
            large: 'table-large',
            medium: 'table-medium',
            small: 'table-small',
        };

        // const onGrade =(e) => {
        //     e.target.value()
        // }

        return sizes[regions.find((region) => region.name === regionName)?.size] || 'table-small';
    };


    return (
        <div>
            <h1>볼링장 정보</h1>
            <div>
                <form action="/bowlingAlley">
                    <input type="search" placeholder="볼링장명을 입력하세요" name="search" />
                    <button type="submit">검색</button>
                </form>
            </div>
            <nav>
                <Nav variant="pills" defaultActiveKey="#first" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    {regions.map((region) => (
                        <Nav.Item key={region.name}>
                            <Link to={'/bowlingAlley/' + region.name} onClick={() => handleRegionClick(region.name)}>
                                {region.name}
                            </Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </nav>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>볼링장명</th>
                        <th>연락처</th>
                        <th>주소</th>
                        <th>핀 세터</th>
                        <th>모니터</th>
                        <th>레인 수</th>
                        <th>레인 타입</th>
                        <th>평점</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((bowling) => (
                        <tr key={bowling.BA_SEQ}>
                            <td>{bowling.BA_NAME}</td>
                            <td>{bowling.BA_TEL}</td>
                            <td>{bowling.BA_ADDR}</td>
                            <td>{bowling.BA_MACHINE}</td>
                            <td>{bowling.BA_MONITOR}</td>
                            <td>{bowling.BA_LANE}</td>
                            <td>{bowling.BA_LANETYPE}</td>
                            <td><button onClick={()=>{nav('/rating/'+bowling.BA_NAME,{state:{bowlingData:bowling}})}}>평점</button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};



export default BowlingTable;
