import React, { useRef, Suspense  } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame, Canvas } from '@react-three/fiber';
import 'aframe';
import 'aframe-ar';
import ModelViewer from 'react-ar-viewer';
// import { Entity, Scene } from 'aframe-react';
// import "@google/model-viewer/dist/model-viewer";

const Backpack = ({ backpack, color, material, metall, isArVisible }) => {
  const group = useRef();

  const [
    denimBaseColorTexture,
    denimNormalTexture,
    denimOrmTexture,
    fabricBaseColorTexture,
    fabricNormalTexture,
    fabricOrmTexture,
    leatherBaseColorTexture,
    leatherNormalTexture,
    leatherOrmTexture,
    metallBaseColorTexture,
    metallNormalTexture,
    metallOrmTexture,
    strapBaseColorTexture,
    strapNormalTexture,
    strapOrmTexture,
  ] = useLoader(THREE.TextureLoader, [
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/denim_baseColor.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/denim_normal.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/denim_occlusionRoughnessMetallic.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/fabric_baseColor.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/fabric_normal.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/fabric_occlusionRoughnessMetallic.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/leather_baseColor.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/leather_normal.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/leather_occlusionRoughnessMetallic.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/metall_baseColor.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/metall_normal.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/metall_occlusionRoughnessMetallic.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/strap_baseColor.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/strap_normal.jpg',
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/strap_occlusionRoughnessMetallic.jpg',
  ]);

  // const backpackObject = backpack.nodes.Back_pack_001;
  const bodyObject = backpack.nodes.Mesh;
  const metallObject = backpack.nodes.Mesh_1;
  const strapObject = backpack.nodes.Mesh_2;

  denimBaseColorTexture.flipY = false;
  denimNormalTexture.flipY = false;
  denimOrmTexture.flipY = false;
  fabricBaseColorTexture.flipY = false;
  fabricNormalTexture.flipY = false;
  fabricOrmTexture.flipY = false;
  leatherBaseColorTexture.flipY = false;
  leatherNormalTexture.flipY = false;
  leatherOrmTexture.flipY = false;
  metallBaseColorTexture.flipY = false;
  metallNormalTexture.flipY = false;
  metallOrmTexture.flipY = false;
  strapBaseColorTexture.flipY = false;
  strapNormalTexture.flipY = false;
  strapOrmTexture.flipY = false;

  // Creating materials
  const bodyMaterialDenim = new THREE.MeshStandardMaterial({
    map: denimBaseColorTexture,
    normalMap: denimNormalTexture,
    aoMap: denimOrmTexture,
    roughnessMap: denimOrmTexture,
    metalnessMap: denimOrmTexture,
  });

  const bodyMaterialFabric = new THREE.MeshStandardMaterial({
    map: fabricBaseColorTexture,
    normalMap: fabricNormalTexture,
    aoMap: fabricOrmTexture,
    roughnessMap: fabricOrmTexture,
    metalnessMap: fabricOrmTexture,
  });

  const bodyMaterialLeather = new THREE.MeshStandardMaterial({
    map: leatherBaseColorTexture,
    normalMap: leatherNormalTexture,
    aoMap: leatherOrmTexture,
    roughnessMap: leatherOrmTexture,
    metalnessMap: leatherOrmTexture,
  });

  const metallMaterial = new THREE.MeshStandardMaterial({
    map: metallBaseColorTexture,
    normalMap: metallNormalTexture,
    aoMap: metallOrmTexture,
    roughnessMap: metallOrmTexture,
    metalnessMap: metallOrmTexture,
    metalness: 1,
    roughness: 0.2,
  });

  const strapMaterial = new THREE.MeshStandardMaterial({
    map: strapBaseColorTexture,
    normalMap: strapNormalTexture,
    aoMap: strapOrmTexture,
    roughnessMap: strapOrmTexture,
    metalnessMap: strapOrmTexture,
  });

  switch (material) {
    case 'leather':
      bodyObject.material = bodyMaterialLeather;
      break;
    case 'denim':
      bodyObject.material = bodyMaterialDenim;
      break;
    case 'fabric':
      bodyObject.material = bodyMaterialFabric;
      break;
    default:
      bodyObject.material = bodyMaterialLeather;
      break;
  }

  metallObject.material = metallMaterial;

  switch (metall) {
    case 'silver':
      metallObject.material.color = new THREE.Color('#fff');
      break;
    case 'black':
      metallObject.material.color = new THREE.Color('#000');
      break;
    case 'gold':
      metallObject.material.color = new THREE.Color('#dab901');
      break;
    default:
      metallObject.material.color = new THREE.Color('#fff');
      break;
  }

  strapObject.material = strapMaterial;
  bodyObject.material.color = new THREE.Color(color);
  strapObject.material.color = new THREE.Color(color);

  useFrame(({ gl }) => {
    if (isArVisible) {
      const session = gl.xr.getSession();
      if (session) {
        const xrViewerPose = gl.xr.getViewerPose(session);
        if (xrViewerPose) {
          const xrHitTestResults = gl.xr.getHitTestResults(session);
          if (xrHitTestResults.length > 0) {
            const hit = xrHitTestResults[0];
            const pose = hit.getPose(xrViewerPose.transform);
            if (pose) {
              // Perform AR-related tasks here, such as positioning and scaling the object
              group.current.position.copy(pose.transform.position);
              group.current.quaternion.copy(pose.transform.orientation);
            }
          }
        }
      }
    }
  });

  return (
    <>
      {isArVisible && (
        <>
        <Canvas
          style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
          }}
        />
        </>
      )}

      {!isArVisible && (
        <group ref={group} position={[0, -0.2, 0]}>
          <Suspense fallback={null}>
            <primitive object={backpack.scene} scale={[1, 1, 1]} />
          </Suspense>
        </group>
      )}
    </>
  );
};

export default Backpack;
