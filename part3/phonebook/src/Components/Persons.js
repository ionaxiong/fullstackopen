import React from "react";

const Persons = ({ persons, filtering, handleDeletePerson }) => {
  return (
    <>
      {filtering === ""
        ? persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
              <button
                type="submit"
                onClick={() => handleDeletePerson(person.id)}
              >
                delete
              </button>
            </p>
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(filtering.toLowerCase())
            )
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
                <button
                  type="submit"
                  onClick={() => handleDeletePerson(person.id)}
                >
                  delete
                </button>
              </p>
            ))}
    </>
  );
};

export default Persons;
