import React from "react";

const Country = ({filteredCountry}) => {
  return (
    <>
      <div>
        <h1>{filteredCountry.name} </h1>
        <p> capital {filteredCountry.capital} </p>
        <p> population {filteredCountry.population} </p>
        <h3>languages</h3>
        {filteredCountry.languages.map((language, index) => (
          <ul key={index} >
            <li >{language.name}</li>
          </ul>
        ))}
        <img
          src={filteredCountry.flag}
          alt="flag"
          width="150"
          height="150"
        ></img>
      </div>
    </>
  );
};

export default Country;
