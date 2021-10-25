import './App.css';
import { useState } from "react";

const Square = ({value, index, onClickHandler}) =>
  <div className={"square_container"} onClick={()=>onClickHandler(index)}>{value}</div>


const Board = ({arraySquare, onClickHandler}) => (
        <div className={"board_container"}>
            {arraySquare?.map((value, index) =>
                <Square key={index} value={value} index={index} onClickHandler={onClickHandler}/>)}
        </div>
    )

const History = ({arrayHistory, onClickHistoryHandler}) => (
    <div className={"history_container"}>
        {arrayHistory?.map((value, index) =>
            <button onClick={() => onClickHistoryHandler(index)}>{`return to: #${index}`}</button>)}
    </div>
)

function App() {
  const [arraySquare, setArraySquare] = useState(Array(9).fill(null))
  const [arrayHistory, setArrayHistory] = useState([Array(9).fill(null)])
  const [nextStep, setNextStep] = useState(true)
  const [currentStepHistory, setCurrentStepHistory] = useState(0)
  const [winner, setWinner] = useState(null)

  const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

  const defineWinner = (arraySquare, winCombinations, currentStep) =>
      winCombinations.find(([a, b, c]) =>
          arraySquare[a] && arraySquare[a] === arraySquare[b] && arraySquare[a] === arraySquare[c])
            ? currentStep
            : null

  const defineStep = step => step ? "X" : "0"

  const getTitle = (winner, nextStep) => winner ? `Winner: ${winner}` : `Next step: ${defineStep(nextStep)}`

  const onClickHistoryHandler = index => {
      setArraySquare(arrayHistory[index])
      setCurrentStepHistory(index)
      setWinner(null)
      setNextStep(index % 2 ===0 ? "X" : 0)
  }

  const onClickHandler = index => {
      if(!arraySquare[index] && !winner) {
          const newArraySquare = [...arraySquare]
          newArraySquare[index] = defineStep(nextStep)
          setArraySquare(newArraySquare)
          setNextStep(!nextStep)
          setWinner(defineWinner(newArraySquare, winCombinations, newArraySquare[index]))
          setArrayHistory( [...arrayHistory.slice(0, currentStepHistory+1),newArraySquare])
          setCurrentStepHistory(currentStepHistory+1)
      }
  }

  return (
    <div className="App">
       <h3 className={'title'}>{getTitle(winner,nextStep)}</h3>
      <Board arraySquare={arraySquare} onClickHandler={onClickHandler}/>
        <History arrayHistory={arrayHistory} onClickHistoryHandler={onClickHistoryHandler}/>
    </div>
  );
}

export default App;
