import React from 'react';
import Button from '@material-ui/core/Button';
import '../App.css';

function Buttons(props) {

  function handleCheckButton() {
    props.onVerifyCheck();
  }

  function handleNewButton() {
    props.onNewPuzzle();
  }

  function handleSolveButton() {
    props.onSolvePuzzle();
  }
    
  return(
    <div>

      <Button 
        style={{margin: "10px"}} 
        variant="contained" 
        color="secondary" 
        onClick={handleCheckButton} >CHECK
      </Button>

      <Button 
        style={{margin: "10px"}} 
        variant="contained" 
        color="secondary" 
        onClick={handleNewButton} >NEW
      </Button>

      <Button
        style={{margin: "10px"}} 
        variant="contained"
        color="secondary"
        onClick={handleSolveButton} >SOLVE
      </Button>

    </div>
  );
}

export default Buttons;