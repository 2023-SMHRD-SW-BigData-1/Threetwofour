import React from 'react'
import IndividualIntervals from './Wrap/IndividualInterval'

const Wrap = () => {
    return (
        <div className="wrap" style={{height:'75rem', display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                <IndividualIntervals />
        </div>
    )
}

export default Wrap