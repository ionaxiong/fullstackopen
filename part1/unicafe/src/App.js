import React, { useState } from "react";

const Instruction = () => {
  return (
    <>
      <h1>give feedback</h1>
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  return(
    <>
      <h1>statistics</h1>
      <span>good {props.good} </span><br />
      <span>neutral {props.neutral} </span><br />
      <span>bad {props.bad} </span>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Instruction />
      <Button handleClick={() => {setGood(good + 1)}} text={"good"} />
      <Button handleClick={() => {setNeutral(neutral + 1)}} text={"neutral"} />
      <Button handleClick={() => {setBad(bad + 1)}} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
