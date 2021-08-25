import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/pit_joined.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        scale={[1, 1, 1]}
        castShadow
        receiveShadow
        geometry={nodes.Torus.geometry}
      >
        <meshToonMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("/pit_joined.gltf");
