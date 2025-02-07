import './App.css'
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import { useState } from 'react';
import { useEffect } from 'react';

const dieColors = {
  4: 'red',
  6: 'orange',
  8: 'yellow',
  10: 'green',
  12: 'blue',
  20: 'purple'
};

function GenerateNum(min, max) {
  /*max is inclusive*/
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

function DisplayDie({die}) {
  return(
    <Grid2>
      Die Size: {die.size} <br />
      Die Value: {die.value}
    </Grid2>
  );
};

function App() {
  const [rolledDice, setRolledDice] = useState([]);
  const [total, setTotal] = useState(0);

  const handleDieButtonClick = (dieSize) => {
    const roll = (GenerateNum(1, dieSize));
    console.log("Roll value: " + roll);

    /* die json object */
    const die = {
      size: dieSize,
      value: roll
    };

    setRolledDice([...rolledDice, die]);
    setTotal(total + die.value);
  }

  return (
    <div>
      {/*Dice Tray*/}
      <Grid2
        container spacing={2}
        alignItems="center"
        justifyContent="center"
        id="DiceTray"
        style = {{backgroundColor: "darkblue"}}
      >
        {/* Display individual die when button is clicked */}
        { rolledDice.map((curDie, i) =>
          <Button key={i} style={{backgroundColor: dieColors[curDie.size]}}>
            D{curDie.size}
            Value: {curDie.value}
          </Button>
        )}
        
      </Grid2>

      {/*Total Display*/}
      <Grid2
        id="TotalRoll"
        style ={{backgroundColor: "gray"}}
      >
        Total: {total}
      </Grid2>

      {/*Dice Selection Buttons*/}
      <Grid2>
          <Button onClick={ () => handleDieButtonClick(4)} variant="text">D4</Button>
          <Button onClick={ () => handleDieButtonClick(6)} variant="text">D6</Button>
          <Button onClick={ () => handleDieButtonClick(8)} variant="text">D8</Button>
          <Button onClick={ () => handleDieButtonClick(10)} variant="text">D10</Button>
          <Button onClick={ () => handleDieButtonClick(12)} variant="text">D12</Button>
          <Button onClick={ () => handleDieButtonClick(20)} variant="text">D20</Button>
      </Grid2>

      {/* Roll Button */}
      <Grid2>
        <Button id="RollButton" varient="text" style = {{color: "white", backgroundColor: "red"}}>ROLL!</Button>
      </Grid2>
    </div>
  );
}


export default App