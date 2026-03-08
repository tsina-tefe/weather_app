import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import Input from "./components/Input"
import OutputDisplay from "./components/OutputDisplay"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

console.log(apiKey);

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getWeather() {
      if(!city) return;
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        //if(!response.ok) throw new Error("Fetching error");
        const data = await response.json();
        if(data.error) throw new Error(`${data.error.message}`);
        setWeather(data);
        console.log(data);
      } catch(error) {
        setError(error.message);
        console.log(error.message);
      }
    }
    getWeather();
    
  },[city]);

  const handleSet = () => {
    setCity(input.trim());
    setInput("");
  };

  const showError = () => {
    // if(error) {
    //   return error;
    // }
    setTimeout(() => {
      setError("");
    }, 1000);
  }
  return (
    <>
      <Header />
      <div className="content">
         <div className="location-section">
            <label className="label-text">LOCATION</label>
            <div className="input-wrapper">
                <input type="text" placeholder='Enter City' onChange={(e) => {
                  setInput(e.target.value);
                }} />
                <button className="set-btn" onClick={handleSet}>SET</button>
            </div>
            <p className="error">{error ? error : ""}{showError()}</p>
        </div>
        <OutputDisplay weather={weather} />
      </div>
      <footer className="footer">
          <span className="footer-text">MY WEATHER</span>
          <div className="footer-line"></div>
      </footer>
    </>
  )
}

export default App
