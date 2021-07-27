import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personsService from "./Services/personsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtering, setFiltering] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFiltering = (e) => {
    setFiltering(e.target.value);
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

    personsService
      .create(infoObject)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePerson = (id) => {
    const deletedName = persons.find((person) => person.id === id).name;
    window.confirm(`Delete ${deletedName} ?`) &&
      personsService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filtering={filtering} handleFiltering={handleFiltering} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addInfo={(event) => addInfo(event)}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filtering={filtering}
        handleDeletePerson={handleDeletePerson}
      />
    </>
  );
};

export default App;
