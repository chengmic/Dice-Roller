import './App.css'
import Button from '@mui/material/Button';


function GenerateNum(min, max) {
  {/*max is inclusive*/}
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

function App() {

  const handleDieClick = (dieValue) => {
    return (GenerateNum(1, dieValue));
    }

  return (
    <>
      <div>
          <Button onClick={ () => handleDieClick(4)} variant="text">D4</Button>
          <Button onClick={ () => handleDieClick(6)} classNamevariant="text">D6</Button>
          <Button onClick={ () => handleDieClick(8)} classNamevariant="text">D8</Button>
          <Button onClick={ () => handleDieClick(10)} classNamevariant="text">D10</Button>
          <Button onClick={ () => handleDieClick(12)} classNamevariant="text">D12</Button>
          <Button onClick={ () => handleDieClick(20)} classNamevariant="text">D20</Button>
      </div>
    </>
  )
}


export default App