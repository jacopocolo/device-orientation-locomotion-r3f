import React, { useRef, useState } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import { Circle, Plane } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function Path(props) {
  const { nodes } = useGLTF("/navMesh.gltf");
  const path = useRef();
  const lookAtPlane = useRef();
  const [mouseDown, setMouseDown] = useState(false);
  const [positionPreview, setPositionPreview] = useState(new THREE.Vector3());
  const [lookAtPreview, setLookAtPreview] = useState(new THREE.Vector3());

  // useEffect(() => {
  //   if (mouseDown === false) {
  //     props.playerMoveTo(positionPreview);
  //     props.playerLookAt(lookAtPreview);
  //   }
  // }, [
  //   lookAtPreview,
  //   positionPreview,
  //   props
  // ]);

  return (
    <>
      {mouseDown === true ? (
        <>
          <Plane
            ref={lookAtPlane}
            args={[10, 10]}
            position={[positionPreview.x, positionPreview.y, positionPreview.z]}
            // position={[0, 0, 0]}
            rotation-x={Math.PI / 2}
            onPointerMove={(event) => {
              setLookAtPreview(
                new THREE.Vector3(
                  event.point.x,
                  event.point.y,
                  event.point.z
                )
              );
            }}
            onPointerUp={() => {
              if (mouseDown === true) {
                // let point = lookAtPreview;
                // let direction = new THREE.Vector3();
                // direction.subVectors(point, positionPreview).normalize();
                // var lookAtPoint = point.clone().addScaledVector(direction, 10);

                // setLookAtPreview(new THREE.Vector3(lookAtPoint.x, lookAtPoint.y, lookAtPoint.z))
                props.playerMoveTo(new THREE.Vector3(positionPreview.x, positionPreview.y + 1.65, positionPreview.z));
                props.playerLookAt(new THREE.Vector3(lookAtPreview.x, lookAtPreview.y + 1.65, lookAtPreview.z));
                setMouseDown(false);
              }
            }}
          >
            <meshStandardMaterial color={"green"} side={DoubleSide} />
          </Plane>
          <Circle
            args={[0.7, 8]}
            position={[
              lookAtPreview.x,
              lookAtPreview.y,
              lookAtPreview.z
            ]}
            rotation-x={Math.PI / 2}
          >
            <meshStandardMaterial color={"black"} side={DoubleSide} />
          </Circle>
          <Circle
            args={[0.7, 8]}
            position={[
              positionPreview.x,
              positionPreview.y,
              positionPreview.z
            ]}
            rotation-x={Math.PI / 2}
          >
            <meshStandardMaterial color={"yellow"} side={DoubleSide} />
          </Circle>
        </>
      ) : (
        <></>
      )
      }
      <group ref={path} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.navMesh.geometry}
          scale={[2, 2, 2]}
          onPointerDown={(event) => {
            if (event.distance < 10) {
              setMouseDown(true);
              setPositionPreview(
                new THREE.Vector3(
                  event.point.x,
                  event.point.y,
                  event.point.z
                )
              );
            } else {
              return;
            }
          }}
        >
          <meshStandardMaterial
            color={"red"}
            side={DoubleSide}
            wireframe={true}
          />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload("/navMesh.gltf");

/*<Plane
      args={[10, 10]}
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      side={THREE.DoubleSide}
      rotation-x={Math.PI / 2}
    >

    </Plane>*/

/*<Plane
        ref={path}
        args={[1, 200]}
        position={[0, 0, 0]}
        rotation-x={Math.PI / 2}
        onPointerDown={(event) => {
          if (event.distance < 10) {
            setMouseDown(true);

            console.log(event.face);

            setPositionPreview(
              new THREE.Vector3(
                event.point.x,
                event.point.y + 1.65,
                event.point.z
              )
            );
          } else {
            return;
          }
        }}
      >
        <meshStandardMaterial
          color={"red"}
          side={DoubleSide}
          wireframe={true}
        />
      </Plane>*/
