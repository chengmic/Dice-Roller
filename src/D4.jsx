import { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
  

function D4(props) {
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
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <tetrahedronGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <Text position={0,0,1}>
        D4
      </Text>
    </mesh>
  )}

export default D4;