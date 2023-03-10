import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const list = Array(7).fill(0)
  const [index, voteIndex] = useState(list)
  const header1 = 'Anecdote of the day'
  const header2 = 'Anecdote with most votes'

  const handleNext = () => {
    const random = Math.floor(Math.random() * 7)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...index]
    copy[selected] += 1
    voteIndex(copy)
  }

  const showBest = () => {
    const max = Math.max(...index)
    const maxIndex = (element) => element === max
    return index.findIndex(maxIndex)
  }
    
  return (
    <div>
      <h1>{header1}</h1>
      {anecdotes[selected]}
      <br></br>
      has {index[selected]} votes
      <br></br>
      <button onClick={handleVote}>
        vote
      </button>
      <button onClick={handleNext}>
        next anecdote
      </button>
      <h1>{header2}</h1>
      <div>
        {anecdotes[showBest()]}
        <br></br>
        has {Math.max(...index)} votes
      </div>
    </div>
  )
}

export default App