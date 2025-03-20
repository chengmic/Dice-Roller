import { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
import { orange, red, yellow } from '@mui/material/colors';
  

function Die3D({size, roll, mod, ...props}) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const getGeometry = () => {
    switch (size) {
      case 4:
        return <tetrahedronGeometry />;
      case 6:
        return <boxGeometry />;
      case 8:
        return <octahedronGeometry />;
      case 10:
        return <dodecahedronGeometry />;
      case 12:
        return <dodecahedronGeometry />;
      case 20:
        return <icosahedronGeometry />;
      default:
        return <boxGeometry />;
    }
  };

  const getColor = () => {
    switch (size) {
      case 4:
        return 'red';
      case 6:
        return 'orange';
      case 8:
        return 'yellow';
      case 10:
        return 'green';
      case 12:
        return 'blue';
      case 20:
        return 'purple';
      default:
        return 'black';
    }
  };

  const getScale = () => {

  };

  const meshColor = getColor()

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}

      // TODO: onClick remove die from diceTray
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {/* Call shape */}
      {getGeometry()}

      {/*Get mesh -- set color and scale based on shape*/}
      <meshStandardMaterial color={hovered ? 'hotpink' : meshColor} />
      
      {/* Total Die Value Text */}
      <Text fontSize={.4} position={[0, 0, 5]}>
        {roll + mod}
      </Text>

      {/* Roll + Mod Text (Displays only if mod is not 0) */}
      {mod !== 0 && (
        <Text fontSize={.2} position={[0, -0.65, 5]} anchorX='center'>
          ({roll} + {mod}) 
        </Text>
      )}
    </mesh>
  )}

export default Die3D;