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

const Statistic = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td> {props.text} </td>
          <td> {props.value} </td>
        </tr>
      </tbody>
    </>
  )
}

const Statistics = (props) => {
 if (props.all() === 0) {
   return (
     <>
       <h1>statistics</h1>
       <p>No feedback give</p>
     </>
   )
 } 
  return(
    <>
      <h1>statistics</h1>
      <table>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={props.all()} />
        <Statistic text="average" value={props.average()} />
        <Statistic text="positive" value={props.positive()} />
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const calculateSum = () => good + neutral + bad;

  const calculateAverage = () => (good - bad) / calculateSum();

  const calculatePositive = () => good / calculateSum() * 100;

  return (
    <div>
      <Instruction />
      <Button handleClick={() => {setGood(good + 1)}} text={"good"} />
      <Button handleClick={() => {setNeutral(neutral + 1)}} text={"neutral"} />
      <Button handleClick={() => {setBad(bad + 1)}} text={"bad"} />
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={() => calculateSum()}
        average={() => calculateAverage()}
        positive={() => calculatePositive()} 
      />
    </div>
  );
};

export default App;
