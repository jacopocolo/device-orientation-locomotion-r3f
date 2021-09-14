import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber"
import {
  Sphere,
  PerspectiveCamera,
  DeviceOrientationControls,
  SpotLight
} from "@react-three/drei";

export default function Player(props) {
  const player = useRef();
  const light = useRef();
  const target = useRef();
  const firstPersonCamera = useRef();
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3());

  useFrame(() => {
    setTargetPosition(
      firstPersonCamera.current.localToWorld(new THREE.Vector3(0, 0, -10))
    );
  })
  useEffect(() => {
    player.current.lookAt(props.lookAt);
    player.current.rotation.y = player.current.rotation.y + Math.PI;
    light.current.target = target.current;
  }, [
    firstPersonCamera,
    player,
    props.lookAt
  ]);

  return (
    <>
      <object3D ref={player} position={props.position}>
        <PerspectiveCamera
          makeDefault
          ref={firstPersonCamera}
        >
          <SpotLight
            ref={light}
            color={"0x0000CD"}
            intensity={0.5}
            position={[0, 0, 0]}
            distance={5}
            angle={0.25}
            decay={0}
            penumbra={0.1}
            attenuation={0}
            anglePower={5} // Diffuse-cone anglePower (default: 5)
            castShadow
            visible={props.flashLight}
          />
        </PerspectiveCamera>
        {props.orientationEnabled === true ? (
          <DeviceOrientationControls camera={firstPersonCamera.current} />
        ) : (
          ""
        )}
      </object3D>
      <Sphere args={[0.1, 6, 6]} position={[props.lookAt.x, props.lookAt.y, props.lookAt.z]} >
        <meshBasicMaterial color={"red"} wireframe={true}></meshBasicMaterial>
      </Sphere>
      <Sphere args={[0.2, 6, 6]} position={[targetPosition.x, targetPosition.y, targetPosition.z]} ref={target} >
        <meshBasicMaterial color={"yellow"}></meshBasicMaterial>
      </Sphere>
    </>
  );
}
