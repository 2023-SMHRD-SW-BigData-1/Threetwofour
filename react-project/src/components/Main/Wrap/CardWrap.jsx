import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CardWrap = ({ imgSrc }) => {
    return (
        <Card>
            <Card.Img variant="top" src={imgSrc} />
            <Card.Body>
                <Card.Text>Wrap/CardWrap.jsx 에 있는 텍스트</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardWrap