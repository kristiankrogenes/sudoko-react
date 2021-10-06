import React, {useState} from 'react';
import './App.css';
import Board from './components/Board.js';
import Buttons from './components/Buttons.js';
import puzzles from './Puzzles.js';
import solvePuzzle from './solver.js';

function App() {

  const [board, setBoard] = useState(formatePuzzle(getRandomPuzzle()));
  const [status, setStatus] = useState(false);
  const [forceRender, setForceRender] = useState(0);

  function getRandomPuzzle() {
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  }

  function formatePuzzle(puzzle) {

    let puzzleArray = [];
    let index = 0;

    for (let i=0; i<9; i++) {

      let currRow = [];

      for (let j=0; j<9; j++) {
        currRow.push({
          cellValue: puzzle[index],
          cellId: i + '' + j,
          editable: puzzle[index] === "0" ? true : false,
          conflict: false
        });
        index++;
      }
      puzzleArray.push(currRow);
    }

    return puzzleArray;
  }

  function handleValueChange(newValue, id) {
    setBoard(prevState => {
      prevState[id[0]][id[1]] = {
        cellValue: newValue,
        cellId: id[0] + '' + id[1],
        editable: true, 
        conflict: !checkValidNumber(newValue, id)
      };
      return prevState;
    });
  }
  
  function handleCheckPuzzle() {

    updateConflicts();

    // console.log(board);

    let isPuzzleComplete = true;

    board.map((row) => {
      row.map((obj) => {
        if (obj.conflict || obj.cellValue === "0") {
          isPuzzleComplete = false;
        }
        return 0;
      })
      return 0;
    })

    setStatus(isPuzzleComplete);
    
    let renderCount = forceRender + 1;
    setForceRender(renderCount);
  }

  function updateConflicts() {
    board.map((row) => {
      row.map((obj) => {
        setBoard(prevState => {
          prevState[obj.cellId[0]][obj.cellId[1]] = {
            cellValue: obj.cellValue,
            cellId: obj.cellId,
            editable: obj.editable, 
            conflict: !checkValidNumber(obj.cellValue, obj.cellId)
          };
          return prevState;
        });
        return 0;
      })
      return 0;
    })
  }

  function checkValidNumber(num, id) {

    const row = parseInt(id[0]);
    const col = parseInt(id[1]);

    const rowStart = Math.floor(row/3)*3;
    const colStart = Math.floor(col/3)*3;

    let validNum = true;

    for (let i=0; i<9; i++) {
      if ((board[row][i].cellValue === num && i !== col && num !==  "0")) {
        validNum = false;
      }
      if ((board[i][col].cellValue === num && i !== row && num !==  "0")) {
        validNum = false;
      }
    }

    for (let j=0; j<3; j++) {
      for (let k=0; k<3; k++) {
        if (board[rowStart+j][colStart+k].cellValue === num && 
          !(row === rowStart+j && col === colStart+k) && num !== "0") {
            validNum = false;
            // console.log(board[rowStart+j][colStart+k].cellValue, num, "|", id, "|", rowStart+j, colStart+k);
        }
      }
    }

    return validNum;
  }

  function handleNewPuzzle() {
    //Array.from(document.querySelectorAll('input')).forEach(item => (item.value = ""));
    setBoard(formatePuzzle(getRandomPuzzle()));
    //handleCheckPuzzle();
  }

  
  function handleSolvePuzzle() {
    const solvedPuzzle = solvePuzzle(board);
    setBoard(solvedPuzzle);
    // console.log(solvedPuzzle);
  }

  return(
    <div className="App">
      {console.log("RENDERED")}

      <h2>SUDOKO</h2>

      <Board 
        puzzleArray={board} 
        onValueChange={handleValueChange}
        onCheckInput={checkValidNumber}
      />

      <Buttons
        onVerifyCheck={handleCheckPuzzle} 
        onNewPuzzle={handleNewPuzzle}
        onSolvePuzzle={handleSolvePuzzle}
      />

      <p>{status ? "CONGRATULATIONS SUDOKO IS COMPLETED !!!" : "INCOMPLETE"}</p>

    </div>
  );
}

export default App;
