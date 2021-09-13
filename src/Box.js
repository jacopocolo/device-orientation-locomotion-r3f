import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Box(props) {
  const ref = useRef();
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      castShadow
      onClick={(event) => setActive(!active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
