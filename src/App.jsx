import './App.css'
import { useState, useEffect } from 'react';
import { Grid2, Button, TextField} from '@mui/material';
import { Canvas} from '@react-three/fiber'
import { Text, Billboard, OrthographicCamera } from '@react-three/drei';
import D6 from './D6';


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

const diePositions = {
  1: [[0, 0, 0]],
  2: [[-3, 0, 0],[3,0,0]],
  3: [[-1.5, 1.5, 0,], [1.5, 1.5, 0,], [0, -1.5, 0]],
  4: [[-1.5, 1.5, 0,], [1.5, 1.5, 0,], [-1.5, -1.5, 0], [1.5, -1.5, 0]],
  5: [[-3, 1.5, 0], [0, 1.5, 0], [3, 1.5, 0], [-1.5, -1.5, 0], [1.5, -1.5, 0]],
  6: [[-3, 1.5, 0], [0, 1.5, 0], [3, 1.5, 0], [-3, -1.5, 0], [0, -1.5, 0], [3, -1.5, 0]],
  7: [[-4.5, 1.5, 0], [-1.5, 1.5, 0], [1.5, 1.5, 0], [4.5, 1.5, 0], [-3, -1.5, 0], [0, -1.5, 0], [3, -1.5, 0]],
  8: [[-4.5, 1.5, 0], [-1.5, 1.5, 0], [1.5, 1.5, 0], [4.5, 1.5, 0], [-4.5, -1.5, 0], [-1.5, -1.5, 0], [1.5, -1.5, 0], [4.5, -1.5, 0]],
  9: [[-6, 1.5, 0], [-3, 1.5, 0], [0, 1.5, 0], [3, 1.5, 0], [6, 1.5, 0], [-4.5, -1.5, 0], [-1.5, -1.5, 0], [1.5, -1.5, 0], [4.5, -1.5, 0]],
 10: [[-6, 1.5, 0], [-3, 1.5, 0], [0, 1.5, 0], [3, 1.5, 0], [6, 1.5, 0], [-6, -1.5, 0], [-3, -1.5, 0], [0, -1.5, 0], [3, -1.5, 0], [6, -1.5, 0]]
}; 


function GenerateNum(min, max) {
  // max is inclusive
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

function App() {
  const [diceTray, setDiceTray] = useState([]);
  const [dieMod, setDieMod] = useState(0);
  const [initialTotal, setInitialTotal] = useState(0);
  const [totalMod, setTotalMod] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  
  // calculate totals
  useEffect (() => {
    const calculateTotal = (dice) => {
      // calculate initial total of all die rolls
      let total = 0;
      for (let i = 0; i < dice.length; i++) {
        total += dice[i].finalValue;
      }
      setInitialTotal(total);

      // calculate final total with total mod
      let newTotal = Math.max(0, total + totalMod);
      setFinalTotal(newTotal);
    };
    calculateTotal(diceTray);
  }, [diceTray, initialTotal, totalMod]);

  // die selection handler
  const handleSelectButtonClick = (dieSize) => {
    if (diceTray.length >= 10) return;
    
    // calculate the roll of individual die
    const roll = (GenerateNum(1, dieSize));
    
    // create die object and add to list
    const die = new Die(dieSize, dieMod, roll);
    setDiceTray([...diceTray, die]);
  }

  // remove dice handlers
  const handleRemoveDie = (die) => {
    const newArr = diceTray.filter((targetDie) => targetDie !== die);
    setDiceTray(newArr);
  }
  const handleClearTray = () => {
    setDiceTray([]);
  }

  // roll button handler
  const handleRollButtonClick = () => {
    let newArr = [];
    for (const die of diceTray) {
      let newRoll = GenerateNum(1, die.size);
      const newDie = new Die (die.size, die.mod, newRoll);
      newArr.push (newDie);
    }
    setDiceTray(newArr);
  }

  // modifier handlers
  const handleDieMod = (e) => {
    let mod = e.target.value;
    setDieMod(Number(mod));
  }
  const handleTotalMod = (e) => {
    let mod = e.target.value;
    setTotalMod(Number(mod));
  }


  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
      <Canvas style={{ width: '50%', height: '50%' }}>
        
        {/* Camera */}
        <OrthographicCamera
          makeDefault
          zoom={2}
          top={10}
          bottom={-10}
          left={-20}
          right={20}
          near={-10}
          far={100}
          position={[0, 0, 12]}
        />
        
        {/* Background */}
        <color attach="background" args={['darkgray']}/>

        {/* Lighting */}
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[0, 0, 10]} angle={0.80} penumbra={2} decay={0} intensity={Math.PI} />
        <pointLight position={[0, 0, -10]} intensity={Math.PI} />

        {/* Objects */}
        {diceTray.map((element, index, array) => (
          <D6 scale={diceTray.length <=2 ? 4: 2} position={diePositions[diceTray.length][index]}/>
        ))}

        {/* Total Display */}
        <Billboard>
          <Text position={[7.5, -4.25, 1]}>Total: {finalTotal}</Text>
        </Billboard>
        
      </Canvas>

      {/*---------------------------- ORIGINAL IMPLEMENTATION BEFORE R3F -------------------------------*/}
      {/* Dice Tray */}
      <Grid2 container spacing={2} alignItems="center" justifyContent="center" style = {{backgroundColor: "darkblue"}}>
        {/* Display individual die when button is clicked */}
        { diceTray.map((curDie, i) =>
          <Button onClick={ () => handleRemoveDie(curDie)} key={i} style={{backgroundColor: dieColors[curDie.size]}}>
            D{curDie.size} <br />
            Mod: {curDie.mod}<br />
            Natural Value: {curDie.naturalValue}<br />
            Actual Value: {curDie.finalValue} <br />
          </Button>
        )}
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
        <TextField onChange = {handleDieMod} type="number" label="Die Modifier" defaultValue="0" />
      </Grid2>

      {/* Total Mod */}
      <Grid2>
        <TextField onChange={handleTotalMod} type="number" label="Total Modifier" value={totalMod} />
      </Grid2>
    </div>
  );
}

export default App
