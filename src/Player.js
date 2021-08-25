import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {
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

  useEffect(() => {
    setTargetPosition(
      firstPersonCamera.current.localToWorld(new THREE.Vector3(0, 0, -10))
    );
    light.current.target = target.current;
    player.current.lookAt(props.lookAt.x, props.lookAt.y, props.lookAt.z);

    //if we are not rendering before the game starts
    if (props.orientationEnabled === true) {
      player.current.rotation.y = player.current.rotation.y + Math.PI;
    }
  }, [
    firstPersonCamera,
    light,
    player,
    props.lookAt,
    props.orientationEnabled
  ]);

  return (
    <>
      <object3D ref={player} position={props.position}>
        <PerspectiveCamera
          makeDefault
          ref={firstPersonCamera}
        ></PerspectiveCamera>
        {props.orientationEnabled === true ? (
          <DeviceOrientationControls camera={firstPersonCamera.current} />
        ) : (
          ""
        )}
      </object3D>
      <SpotLight
        position={props.position}
        ref={light}
        distance={20}
        angle={0.5}
        decay={2}
        penumbra={1}
        attenuation={5}
        anglePower={5} // Diffuse-cone anglePower (default: 5)
        castShadow
      />
      <object3D position={targetPosition} ref={target} />
    </>
  );
}
