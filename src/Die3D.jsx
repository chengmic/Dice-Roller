import { useState, useRef } from 'react';
import { Text } from '@react-three/drei';


function Die3D({size, roll, mod, onClick, traySize, ...props}) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

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
    switch (size) {
      case 4:
        return 2.6;
      case 6:
        return 3;
      case 8:
        return 2.1;
      case 10:
        return 2;
      case 12:
        return 1.8;
      case 20:
        return 1.8;
      default:
        return 1;
    }
  };

  const getFinalScale = () => {
    let FinalScale = traySize <= 2 ? getScale() : getScale() / 1.5;
    return FinalScale;
  }

  const meshColor = getColor()
  const dieScale = getScale()

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}

      // scale
      scale = {getFinalScale()}

      // Remove die from diceTray
      onClick={onClick}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >

      {/* Call shape */}
      {getGeometry()}

      {/*Get mesh -- set color and scale based on shape*/}
      <meshStandardMaterial color={hovered ? 'hotpink' : meshColor}/>
      
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