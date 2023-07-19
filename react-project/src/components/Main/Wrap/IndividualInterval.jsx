import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstImg from '../../../img/Spin.jpg'
import secondImg from '../../../img/intro.png'
import CardWrap from './CardWrap';
import CardGroup from 'react-bootstrap/CardGroup';


const IndividualIntervals = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} style={{height:'-webkit-fill-available'}}>
                <Carousel.Item >
                    <CardWrap imgSrc={firstImg} text={''} />
                </Carousel.Item>
                <Carousel.Item>
                    <CardWrap imgSrc={secondImg} text={''} />
                </Carousel.Item>
        </Carousel >
    );
}



export default IndividualIntervals;