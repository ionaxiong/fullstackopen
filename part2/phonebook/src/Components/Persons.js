import React from "react";

const Persons = ({ persons, filtering }) => {
  return (
    <>
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

export default Persons;
