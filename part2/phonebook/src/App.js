import React, { useState } from "react";

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
      <div>
        filter shown with <input value={filtering} onChange={handleFiltering} />
      </div>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={(event) => addInfo(event)}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtering === ""
        ? persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(filtering.toLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))}
    </>
  );
};

export default App;
