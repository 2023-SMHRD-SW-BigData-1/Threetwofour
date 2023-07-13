import React from 'react'
import ClubBox from './ClubBox'

const TeamContent = ({ team, imgSrc }) => {

  return (
    <div className="team-content">

    {team.map(item =>
        <ClubBox
            key={item.memId}
            name={item.memNick}
            position={item.memRegion}
            imgSrc={imgSrc}
        />
    )
    }


</div>
  )
}

export default TeamContent