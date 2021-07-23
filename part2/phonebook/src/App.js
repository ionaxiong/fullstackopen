import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    const nameObject = { name: newName };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}> {person.name} </p>
      ))}
    </>
  );
};

export default App;
