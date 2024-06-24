import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5dbb6f82f565610b8a03a8e8e8539283`;

  const searchLocation = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError("");
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setData({});
          setError("City not found");
        } else {
          setData({});
          setError("An error occurred");
        }
      }
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        ></input>
        <button onClick={searchLocation} className="bold">
          Search
        </button>
      </div>

      <div className={`container ${error ? "error" : ""}`}>
        <div className="top">
          <div className="loaction">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity middle">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
        {error && <h1 className="error">{error}</h1>}
      </div>
    </div>
  );
}

export default App;
