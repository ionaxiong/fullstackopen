import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ filteredCountry }) => {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [wind, setWind] = useState({ speed: "", direction: "" });

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const params = { access_key: api_key, query: filteredCountry.capital };
    const config_object = { params: params };
    axios
      .get("http://api.weatherstack.com/current", config_object)
      .then((response) => response.data)
      .then((data) => {
        setLocation(data.location.name);
        setTemperature(data.current.temperature);
        setWeatherIcon(data.current.weather_icons);
        setWind({
          speed: data.current.wind_speed,
          direction: data.current.wind_dir,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <h1>{filteredCountry.name} </h1>
        <p> capital {filteredCountry.capital} </p>
        <p> population {filteredCountry.population} </p>
        <h3>languages</h3>
        {filteredCountry.languages.map((language, index) => (
          <ul key={index}>
            <li>{language.name}</li>
          </ul>
        ))}
        <img
          src={filteredCountry.flag}
          alt="flag"
          width="150"
          height="150"
        ></img>
        <h3>Weather in {location} </h3>
        <p>
          <strong>temperature: </strong> {temperature} Celcius{" "}
        </p>
        <img src={weatherIcon}></img>
        <p>
          <strong>Wind: </strong> {wind.speed} mph direction {wind.direction}{" "}
        </p>
      </div>
    </>
  );
};

export default Country;
