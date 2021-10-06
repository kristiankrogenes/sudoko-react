
function getEditableSquares(board) {

  let editableSquares = [];

  for (let i=0; i<9; i++) {
    for (let j=0; j<9; j++) {
      if (board[i][j].editable) {
        editableSquares.push(board[i][j]);
      }
    }
  }
  return editableSquares;
}

function isValidValue(square, i, board) {

  const num = i.toString();
  const row = parseInt(square.cellId[0]);
  const col = parseInt(square.cellId[1]);

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
      }
    }
  }

  return validNum; 
}

function solvePuzzle(currboard) {

  for (let i=0; i<9; i++) {
    for (let j=0; j<9; j++) {
      if (currboard[i][j].conflict && currboard[i][j].editable) {
        currboard[i][j].cellValue = "0";
      }
    }
  }

  const editableSquares = getEditableSquares(currboard);

  const board = JSON.parse(JSON.stringify(currboard)); // Copy old array 

  let index = 0;

  while (index < editableSquares.length) {

    let noValueFound = true;

    for (let i=parseInt(editableSquares[index].cellValue); i<10; i++) {
      if (isValidValue(editableSquares[index], i, board) && i !== 0) {
        editableSquares[index].cellValue = i.toString();
        board[editableSquares[index].cellId[0]][editableSquares[index].cellId[1]].cellValue = i.toString();
        index++;
        noValueFound = false;
        break;
      }
    }

    if (noValueFound) {
      editableSquares[index].cellValue = "0";
      board[parseInt(editableSquares[index].cellId[0])][parseInt(editableSquares[index].cellId[1])].cellValue = "0";

      let lastValue = parseInt(editableSquares[index-1].cellValue);
      lastValue++;
      editableSquares[index-1].cellValue = lastValue.toString();

      board[parseInt(editableSquares[index-1].cellId[0])][parseInt(editableSquares[index-1].cellId[1])].cellValue = "0";
      
      index--;
    }
  }
  return board;
}

export default solvePuzzle;

