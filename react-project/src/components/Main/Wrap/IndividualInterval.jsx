import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstImg from '../../../img/Spin.jpg'
import secondImg from '../../../img/intro.png'

const IndividualIntervals = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item >
                <img
                    className="d-flex w-auto h-auto"
                    src={firstImg}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-flex w-auto h-auto"
                    src={secondImg}
                    alt="Second slide"
                />
            </Carousel.Item>
            {/* <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />
  
        </Carousel.Item> */}
        </Carousel >
    );
}



export default IndividualIntervals;