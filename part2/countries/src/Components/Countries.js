import React, { useState } from "react";
import Country from "./Country";

const Countries = ({ countries, filtering }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filtering.toLowerCase())
  );

  const [selectedCountry, setSelectedCountry] = useState();

  const handleShowData = (filteredCountry) => {
    setSelectedCountry(filteredCountry);
    console.log(selectedCountry);
  };

  return (
    <>
      {filteredCountries.length === 1 ? (
        filteredCountries.map((filteredCountry, i) => (
          <Country key={i} filteredCountry={filteredCountry} />
        ))
      ) : filteredCountries.length > 1 && filteredCountries.length <= 10 ? (
        <div>
          {filteredCountries.map((filteredCountry, x) => (
            <div key={x}>
              {filteredCountry.name}
              <button
                type="submit"
                onClick={() => handleShowData(filteredCountry)}
              >
                show
              </button>
            </div>
          ))}
          {selectedCountry != null && (
            <Country filteredCountry={selectedCountry} />
          )}
        </div>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </>
  );
};

export default Countries;
