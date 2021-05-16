import React from 'react';
import Square from './Square.js';

function Board(props) {

  let keyIndex = -1;

  return(
    <table className="board">
      <tbody>
        {props.puzzleArray.map((row) => {
          return(
            <tr key={row[0].cellId[0]}>
              {row.map((obj) => {
                keyIndex++;
                return(
                  <Square
                    key={keyIndex}
                    id={obj.cellId}
                    value={obj.cellValue}
                    editable={obj.editable}
                    conflict={obj.conflict}
                    onValueChange={props.onValueChange}
                    onCheckInput={props.onCheckInput}>
                  </Square>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;