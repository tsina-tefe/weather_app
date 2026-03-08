import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import OutputDisplay from "./components/OutputDisplay";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

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

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading("");
      }
    }
    getWeather();
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
