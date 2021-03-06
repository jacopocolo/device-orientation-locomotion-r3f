import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Box from "./Box";
import Player from "./Player";
import Navigation from "./Navigation";
import Map from "./Map.js";

export default function Game(props) {
  const [userInteracted, setUserInteracted] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(
    new THREE.Vector3(0, 1.65, 0)
  );
  const [playerLookAt, setPlayerLookAt] = useState(
    new THREE.Vector3(1, 1.65, 10)
  );
  const [flashLight, setFlashLight] = useState(true);

  return (
    <>
      {userInteracted === false ? (
        <div
          className="overlay"
          onClick={() => {
            setUserInteracted(true);
          }}
        >
          Start
        </div>
      ) : (
        ""
      )}
      <Canvas
        onMouseMove={(event) => event.preventDefault()}
        onTouchMove={(event) => event.preventDefault()}
      >
        <color attach="background" args={['midnightblue']} />
        <hemisphereLight args={[0x000080, 0x191970, 1]} castShadow />
        <Box position={[3, 5, -10]} color={"navy"} />
        <Box position={[2, 4, -10]} color={"blue"} />
        <Box position={[1, 3, -10]} color={"teal"} />

        <Box position={[-3, 5, -10]} color={"pink"} />
        <Box position={[-2, 4, -10]} color={"orange"} />
        <Box position={[-1, 3, -10]} color={"red"} />
        <Suspense fallback={<Box />}>
          <Map />
          <Navigation
            playerMoveTo={setPlayerPosition}
            playerLookAt={setPlayerLookAt}
          />
        </Suspense>
        <Player
          position={[playerPosition.x, playerPosition.y, playerPosition.z]}
          lookAt={playerLookAt}
          orientationEnabled={userInteracted}
          flashLight={flashLight}
        />
      </Canvas>
      <button className={"toggleflashlight"} onClick={()=>{setFlashLight(!flashLight)}}>Toggle flashlight</button>
    </>
  );
}
