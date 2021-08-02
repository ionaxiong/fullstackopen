import React from "react";
import "../index.css";

const Warning = ({ warning }) => {
  if (warning === "") {
    return null;
  }
  return <div className="warning">{warning}</div>;
};

export default Warning;
