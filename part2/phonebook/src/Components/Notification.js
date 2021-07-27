import React from "react";
import "../index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="reminder">{message}</div>;
};

export default Notification;
