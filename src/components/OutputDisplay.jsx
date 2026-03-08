import React from 'react'

const OutputDisplay = ({ weather}) => {

    const formatDate = (date) => {
        const dateObj = new Date(date.replace(' ', 'T'));
        const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
        };

        const formattedDate = dateObj.toLocaleDateString('en-US', options);
        return formattedDate;
    }

  return (
    <div className="weather-display-card">
        <div className="weather-icon">
            <img 
                src="https://cdn-icons-png.flaticon.com/512/4834/4834559.png" 
                alt="Weather Icon" 
                style={{ width: '120px', height: '120px', objectFit: 'contain' }} 
            />
        </div>
        
        <div className="weather-details">
            <div className="temp">{weather ? weather.current.temp_c : 21}°c</div>
            <div className="condition">{weather ? weather.current.condition.text : "Clouds"}</div>
            <div className="date">{weather ? formatDate(weather.current.last_updated) : "Sunday, July 21"}</div>
            <div className="city">{weather ? weather.location.name + ", " + weather.location.country : "London, United Kingdom"}</div>
        </div>
    </div>
  )
}

export default OutputDisplay