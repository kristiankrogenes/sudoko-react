import React, { useState, useEffect } from 'react';

function Square(props) {

  const [squareValue, setSquareValue] = useState("");

  useEffect(() => {
    setSquareValue(props.value === "0" ? "" : props.value);
  }, [props.value]);

  const row = props.id[0];
  const col = props.id[1];

  const style = {

  };
  
  if(row > 0 && row % 3 === 0) {
    style['borderTop'] = '4px solid black';
  }

  if(col > 0 && col % 3 === 0) {
    style['borderLeft'] = '4px solid black';
  }

  if (props.conflict) {
    style['backgroundColor'] = 'red';
  } else {
    props.editable ? style['backgroundColor'] = 'white' : style['backgroundColor'] = 'lightgrey';
  }
  
  function handleSquareValueChange(e) {

    const newSquareValue = e.target.value;

    if (!isNaN(newSquareValue) && !(newSquareValue === "0")) {

      setSquareValue(newSquareValue);

      if (!(newSquareValue === "")) {
        props.onValueChange(newSquareValue, props.id);
      }
      if (newSquareValue === "") {
        props.onValueChange("0", props.id);
      }
    }
  }

  return(
    <td>
      <input 
        type="text" 
        className="square"
        style={style}
        value={squareValue}
        disabled={!props.editable}
        onChange={handleSquareValueChange} 
        maxLength='1' />
    </td>
  );
}

export default Square;