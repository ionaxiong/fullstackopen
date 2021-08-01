import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personsService from "./Services/personsService";
import Notification from "./Components/Notification";
import Warning from "./Components/Warning";

const App = () => {
  const [persons, setPersons] = useState([{ name: "", number: "" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtering, setFiltering] = useState("");
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");

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
    setNewName(name);
  };

  const handleNewNumber = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  };

  const updateNumber = (id, existingPerson, newNumber) => {
    existingPerson.number = newNumber;
    return personsService
      .update(id, existingPerson) // Send the data to the server to be updated
      .then(() => { // if server responds OK, update local data aswell
        const updatedPersons = [...persons];
          updatedPersons.map((x) => {
            if (x.name === existingPerson.name) {
              x.number = newNumber;
            }
            return x;
          });
          setMessage(`${newName}'s number is changed`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
          setPersons(updatedPersons);
      })
      .catch((err) => { // if server has an error, display the error message
        setWarning(`${err.response.data.error}`);
        setTimeout(() => {
          setWarning("");
        }, 5000);
      });
  };

  const addInfo = (e) => {
    e.preventDefault();
    const infoObject = { name: newName, number: newNumber };
    const existingPerson = { ...persons.find((x) => x.name === newName) };
    if (existingPerson) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        // refactor code that all the updating happens inside the updateNumber function, 
        // - updating the server
        // - updating local if the server is fine
        // - displaying error message
        updateNumber(existingPerson.id, existingPerson, newNumber);
      }
    } else {
      personsService
        .create(infoObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setMessage("");
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          setWarning(`${err.response.data.error}`);
          setTimeout(() => {
            setWarning("");
          }, 5000);
          console.log(err);
        });
    }
  };

  const handleDeletePerson = (id) => {
    const deletedName = persons.find((person) => person.id === id).name;
    window.confirm(`Delete ${deletedName} ?`) &&
      personsService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((err) => {
          setWarning(
            `Information of ${deletedName} has already been removed from server`
          );
          setTimeout(() => {
            setWarning("");
          }, 5000);
          console.log(err);
        });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Warning warning={warning} />
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
