import './App.css'
import { useState, useEffect } from 'react';
import { Grid2, Button, TextField } from '@mui/material';
import { mx_bilerp_0 } from 'three/src/nodes/materialx/lib/mx_noise.js';

class Die {
  constructor(size, mod=0, naturalValue=0) {
    this.size = size;
    this.naturalValue = naturalValue;
    this.mod = mod;
    this.finalValue = Math.max(0, this.naturalValue + this.mod);
  }
}

const dieColors = {
  4: 'red',
  6: 'orange',
  8: 'yellow',
  10: 'green',
  12: 'blue',
  20: 'purple'
};

function GenerateNum(min, max) {
  // max is inclusive
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

function App() {
  const [rolledDice, setRolledDice] = useState([]);
  const [dieMod, setDieMod] = useState(0);
  const [initialTotal, setInitialTotal] = useState(0);
  const [totalMod, setTotalMod] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  
  useEffect (() => {
    const calculateTotal = (dice) => {
      // calculate initial roll total
      let total = 0;
      for (let i = 0; i < dice.length; i++) {
        total += dice[i].finalValue;
      }
      setInitialTotal(total);

      // calculate final total with total mod
      let newTotal = Math.max(0, total + totalMod);
      setFinalTotal(newTotal);
    }

    calculateTotal(rolledDice);
  }, [rolledDice, initialTotal, totalMod]);

  // calculate the roll of individual die
  const handleSelectButtonClick = (dieSize) => {
    const roll = (GenerateNum(1, dieSize));
    console.log("Roll value: " + roll);
    
    // create die object and add to list
    const die = new Die(dieSize, dieMod, roll);
    setRolledDice([...rolledDice, die]);
  }

  const handleRemoveDie = (die) => {
    const newArr = rolledDice.filter((targetDie) => targetDie !== die);
    setRolledDice(newArr);
  }

  const handleClearTray = () => {
    setRolledDice([]);
  }

  const handleRollButtonClick = () => {
    let newArr = [];
    for (const die of rolledDice) {
      let newRoll = GenerateNum(1, die.size);
      const newDie = new Die (die.size, die.mod, newRoll);
      newArr.push (newDie);
    }
    setRolledDice(newArr);
  }

  // handle modifiers
  const handleChangeDieMod = (e) => {
    let mod = e.target.value;
    setDieMod(Number(mod));
  }

  const handleChangeTotalMod = (e) => {
    let mod = e.target.value;
    setTotalMod(Number(mod));
  }
    
  return (
    <div>
      {/* Dice Tray */}
      <Grid2
        container spacing={2}
        alignItems="center"
        justifyContent="center"
        id="DiceTray"
        style = {{backgroundColor: "darkblue"}}
      >
        {/* Display individual die when button is clicked */}
        { rolledDice.map((curDie, i) =>
          <Button onClick={ () => handleRemoveDie(curDie)} key={i} style={{backgroundColor: dieColors[curDie.size]}}>
            D{curDie.size} <br />
            Mod: {curDie.mod}<br />
            Natural Value: {curDie.naturalValue}<br />
            Actual Value: {curDie.finalValue} <br />
          </Button>
        )}
        
      </Grid2>

      {/* Total Display */}
      <Grid2
        id="TotalRoll"
        style ={{backgroundColor: "gray"}}
      >
        Total: {finalTotal}
      </Grid2>

      {/* Dice Selection Buttons */}
      <Grid2>
          <Button onClick={ () => handleSelectButtonClick(4)} variant="text">D4</Button>
          <Button onClick={ () => handleSelectButtonClick(6)} variant="text">D6</Button>
          <Button onClick={ () => handleSelectButtonClick(8)} variant="text">D8</Button>
          <Button onClick={ () => handleSelectButtonClick(10)} variant="text">D10</Button>
          <Button onClick={ () => handleSelectButtonClick(12)} variant="text">D12</Button>
          <Button onClick={ () => handleSelectButtonClick(20)} variant="text">D20</Button>
      </Grid2>

      {/* Roll Button */}
      <Grid2>
        <Button id="RollButton" onClick= {() => handleRollButtonClick()}variant="text" style = {{color: "white", backgroundColor: "red"}}>ROLL!</Button>
      </Grid2>

      {/* Clear Button */}
      <Grid2>
        <Button onClick={() => handleClearTray()} variant="text" style = {{color: "black", backgroundColor: "white"}}>Clear</Button>
      </Grid2>

      {/* Die Mod */}
      <Grid2>
        <TextField onChange = {handleChangeDieMod} type="number" label="Die Modifier" defaultValue="0" />
      </Grid2>

      {/* Total Mod */}
      <Grid2>
        <TextField onChange={handleChangeTotalMod} type="number" label="Total Modifier" value={totalMod} />
      </Grid2>
    </div>
  );
}

export default App
