import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import OutputDisplay from "./components/OutputDisplay";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getWeather() {
      if (!city) return;
      try {
        const response = await fetch("http://localhost:3000/api/weather", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ city }),
        });
        if (!response.ok) {
          const error = await response.json();
          const errorMessage = error.message;
          throw new Error(errorMessage);
        }
        const data = await response.json();

        setWeather(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getWeather();
  }, [city]);

  const handleSet = () => {
    setCity(input.trim());
    setInput("");
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="location-section">
          <label className="label-text">LOCATION</label>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter City"
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
            />
            <button className="set-btn" onClick={handleSet}>
              SET
            </button>
          </div>
          <p className="error">{error ? error : ""}</p>
        </div>
        <OutputDisplay weather={weather} />
      </div>
      <footer className="footer">
        <span className="footer-text">MY WEATHER</span>
        <div className="footer-line"></div>
      </footer>
    </>
  );
}

export default App;
