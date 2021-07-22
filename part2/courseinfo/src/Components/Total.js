import React from "react";

const Total = ({ parts }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const exercises = parts.map((part) => part.exercises);
  const total = exercises.reduce(reducer);

  return (
    <>
      <h4>total of {total} exercises</h4>
    </>
  );
};

export default Total;
