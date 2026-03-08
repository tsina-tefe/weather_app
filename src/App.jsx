import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import OutputDisplay from "./components/OutputDisplay";
import { weatherService } from "./services/weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (!city) return;
    weatherService
      .getWeatherByCity(city)
      .then((data) => setWeather(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(""));
  }, [city]);

  const handleSet = () => {
    if (input.trim() === "") {
      setError("Please enter location");
      return;
    }
    setLoading("Loading...");
    setCity(input.trim());
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSet();
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="location-section">
          <label className="label-text">LOCATION</label>
          <div className="input-wrapper">
            <input
              value={input}
              type="text"
              placeholder="Enter City"
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              onKeyDown={() => {
                handleKeyDown(event);
              }}
            />
            <button className="set-btn" onClick={handleSet}>
              SET
            </button>
          </div>
          <p className="error">{error ? error : ""}</p>
          <p className="loading">{loading ? loading : ""}</p>
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
