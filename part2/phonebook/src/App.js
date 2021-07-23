import React, { useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtering, setFiltering] = useState("");

  const handleFiltering = (e) => {
    setFiltering(e.target.value);
    console.log(e.target.value);
  };

  const handleNewName = (e) => {
    const name = e.target.value;
    if (persons.find((x) => x.name === name)) {
      window.alert(`${name} is already added to phonebook`);
    }
    setNewName(name);
  };

  const handleNewNumber = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  };

  const addInfo = (e) => {
    e.preventDefault();
    const infoObject = { name: newName, number: newNumber };
    setPersons(persons.concat(infoObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filtering={filtering} handleFiltering={handleFiltering} />
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} addInfo={(event) => addInfo(event)} />
      <h2>Numbers</h2>
      <Persons persons={persons} filtering={filtering} />
    </>
  );
};

export default App;
