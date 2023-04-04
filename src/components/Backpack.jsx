import React, { useRef } from 'react';
import * as THREE from 'three';
import { useLoader, Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import 'aframe';
import 'aframe-ar';
import { ARButton, XR } from '@react-three/xr'
// import { Entity, Scene } from 'aframe-react';
// import "@google/model-viewer/dist/model-viewer";

const Backpack = ({ color, material, metall, isArVisible }) => {
  const group = useRef();
  const backpack = useLoader(
    GLTFLoader,
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/backpack.glb'
  );

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

  return (
    <>
      {/* {isArVisible && (
        <Scene embedded arjs='sourceType: webcam;'>
          <a-gltf-model 
            src="https://myassetsfordev.s3.eu-north-1.amazonaws.com/backpack.glb"
            scale="1.05 1.05 1.05"
            rotation="0 -45 0"
            position="0 1 -1"
          ></a-gltf-model>
        </Scene>
      )} */}

      {isArVisible && (
        <>
          <ARButton />
          <Canvas>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} />
            <XR>
              <primitive object={backpack.scene} scale={[5, 5, 5]} rotation={[0, -1, 0]}/>
            </XR>
          </Canvas>
        </>
      )}

      {!isArVisible && (
        <group ref={group} position={[0, -0.2, 0]}>
          <primitive object={backpack.scene} scale={[1, 1, 1]} />
        </group>
      )}
    </>
  );
};

export default Backpack;
