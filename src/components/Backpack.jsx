import React, { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import  ModelViewer  from 'react-ar-viewer';
import { 
  createBodyMaterialDenim,
  createBodyMaterialFabric,
  createBodyMaterialLeather,
  createMetallMaterial,
  createStrapMaterial,
} from '../utils/materials';

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

  const bodyObject = backpack.nodes.Mesh;
  const metallObject = backpack.nodes.Mesh_1;
  const strapObject = backpack.nodes.Mesh_2;

  const bodyMaterialDenim = createBodyMaterialDenim(
    denimBaseColorTexture,
    denimNormalTexture,
    denimOrmTexture
  );

  const bodyMaterialFabric = createBodyMaterialFabric(
    fabricBaseColorTexture,
    fabricNormalTexture,
    fabricOrmTexture
  );

  const bodyMaterialLeather = createBodyMaterialLeather(
    leatherBaseColorTexture,
    leatherNormalTexture,
    leatherOrmTexture
  );

  const metallMaterial = createMetallMaterial(
    metallBaseColorTexture,
    metallNormalTexture,
    metallOrmTexture
  );

  const strapMaterial = createStrapMaterial(
    strapBaseColorTexture,
    strapNormalTexture,
    strapOrmTexture
  );

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
      {isArVisible && (
        <ModelViewer
          buttonImage={'https://picsum.photos/200/200'}
          buttonText={'View in your space'}
          width={'90vw'}
          height={'90vw'}
          src={'https://myassetsfordev.s3.eu-north-1.amazonaws.com/backpack.glb'}
          iosSrc={'https://myassetsfordev.s3.eu-north-1.amazonaws.com/backpack.usdz'}
          poster={''}
          alt={'Sample usage on component'}
          cameraControls={true}
          ar={true}
          cameraTarget={'0m 0m 0m'}
          cameraOrbit={'0 deg 0deg 0%'}
          exposure={1}
          shadowSoftness={0}
          autoPlay={true}
        />
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
