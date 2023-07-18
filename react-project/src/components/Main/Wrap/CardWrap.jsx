import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardWrap = ({ imgSrc,text }) => {
    return (
        <Card>
            <Card.Img variant="top" src={imgSrc} />
            <Card.Body>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardWrap