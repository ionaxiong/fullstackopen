import React from "react";
import Part from "./Part";

const Content = ({ content }) => {
  return (
    <>
      {content.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

export default Content;
