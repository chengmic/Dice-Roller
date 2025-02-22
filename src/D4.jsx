import { useState, useRef } from 'react';

function D4(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <tetrahedronGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'red'} />
    </mesh>
  )}

export default D4;