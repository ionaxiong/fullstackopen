import React, { useState } from "react";

const Countries = ({ countries, filtering }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filtering.toLowerCase())
  );

  return (
    <>
      {filteredCountries.length === 1 ? (
        filteredCountries.map((filteredCountry, i) => (
          <div key={i}>
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
          </div>
        ))
      ) : filteredCountries.length > 1 && filteredCountries.length <= 10 ? (
        filteredCountries.map((filteredCountry, x) => (
          <p key={x}>{filteredCountry.name}</p>
        ))
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </>
  );
};

export default Countries;
