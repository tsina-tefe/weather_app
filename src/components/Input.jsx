import React from 'react'

const Input = () => {
  return (
    <div className="location-section">
        <label className="label-text">LOCATION</label>
        <div className="input-wrapper">
            <input type="text" placeholder='Enter City' />
            <button className="set-btn">SET</button>
        </div>
    </div>
  );
}

export default Input
