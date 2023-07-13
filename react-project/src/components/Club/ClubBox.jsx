import React from 'react'

const ClubBox = ({ name, position, imgSrc }) => {
  return (
    <div className="box">
      <img src={imgSrc} />
      <h3>{name}</h3>
      <h5>{position}</h5>
      <div className="icons">

      </div>
    </div>
  )
}

export default ClubBox