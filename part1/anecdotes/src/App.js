import React, { useState } from 'react'

const AnecdoteWithMostVotes  = (props) => {
  const currentVotesList = [...props.votes];

  var max = currentVotesList[0];
  var maxIndex = 0;

  for (var i = 1; i < currentVotesList.length; i++) {
    if (currentVotesList[i] > max) {
      max = currentVotesList[i];
      maxIndex = i;
    }
  }

  return(
    <>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maxIndex]}
      <p>has {max} votes </p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const currentVotesList = [...votes];
    currentVotesList[selected] += 1;
    setVotes(currentVotesList);
  }

  return (
    <div>
      {anecdotes[selected]} <br/>
      <p>has {votes[selected]} votes</p> 
      <button onClick={() => handleVote()} >vote</button>
      <button onClick={() => handleClick()}>next anecdote</button>
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App