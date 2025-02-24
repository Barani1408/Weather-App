import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import rain from "../assets/wind.png";

import "./weather.css";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      alert(error)
    }
  };

  useEffect(() => {
    search("salem");
  },[]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputRef} />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature"> {weatherData.temperature}°</p>
      <p className="location"> {weatherData.location}</p>

      {weatherData ? (
        <>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p> 91%</p>
                <span> {weatherData.humidity}</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p> {weatherData.windspeed}</p>
                <span> Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Weather;
