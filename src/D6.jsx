import { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
  

function D6(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      // TODO: onClick remove die from diceTray
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <Text fontSize={.4} position={[0, 0, 5]}>Num</Text>
      <Text fontSize={.2} position={[0, -0.65, 5]}> (mod + roll) </Text>
    </mesh>
  )}

export default D6;