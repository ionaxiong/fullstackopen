import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Components/Countries";
import Filter from "./Components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFiltering = (e) => {
    setFiltering(e.target.value)
  }

  return (
    <>
      <Filter filtering={filtering} handleFiltering={handleFiltering} />
      <Countries countries={countries} filtering={filtering} />
    </>
  );
};

export default App;
