import * as THREE from 'three';

export const createBodyMaterialDenim = (
  denimBaseColorTexture,
  denimNormalTexture,
  denimOrmTexture
) => {
  const bodyMaterialDenim = new THREE.MeshStandardMaterial({
    map: denimBaseColorTexture,
    normalMap: denimNormalTexture,
    aoMap: denimOrmTexture,
    roughnessMap: denimOrmTexture,
    metalnessMap: denimOrmTexture,
  });

  denimBaseColorTexture.flipY = false;
  denimNormalTexture.flipY = false;
  denimOrmTexture.flipY = false;

  return bodyMaterialDenim;
};

export const createBodyMaterialFabric = (
  fabricBaseColorTexture,
  fabricNormalTexture,
  fabricOrmTexture
) => {
  const bodyMaterialFabric = new THREE.MeshStandardMaterial({
    map: fabricBaseColorTexture,
    normalMap: fabricNormalTexture,
    aoMap: fabricOrmTexture,
    roughnessMap: fabricOrmTexture,
    metalnessMap: fabricOrmTexture,
  });

  fabricBaseColorTexture.flipY = false;
  fabricNormalTexture.flipY = false;
  fabricOrmTexture.flipY = false;

  return bodyMaterialFabric;
};

export const createBodyMaterialLeather = (
  leatherBaseColorTexture,
  leatherNormalTexture,
  leatherOrmTexture
) => {
  const bodyMaterialLeather = new THREE.MeshStandardMaterial({
    map: leatherBaseColorTexture,
    normalMap: leatherNormalTexture,
    aoMap: leatherOrmTexture,
    roughnessMap: leatherOrmTexture,
    metalnessMap: leatherOrmTexture,
  });

  leatherBaseColorTexture.flipY = false;
  leatherNormalTexture.flipY = false;
  leatherOrmTexture.flipY = false;

  return bodyMaterialLeather;
};

export const createMetallMaterial = (
  metallBaseColorTexture,
  metallNormalTexture,
  metallOrmTexture
) => {
  const metallMaterial = new THREE.MeshStandardMaterial({
    map: metallBaseColorTexture,
    normalMap: metallNormalTexture,
    aoMap: metallOrmTexture,
    roughnessMap: metallOrmTexture,
    metalnessMap: metallOrmTexture,
    metalness: 1,
    roughness: 0.2,
  });

  metallBaseColorTexture.flipY = false;
  metallNormalTexture.flipY = false;
  metallOrmTexture.flipY = false;

  return metallMaterial;
};

export const createStrapMaterial = (
  strapBaseColorTexture,
  strapNormalTexture,
  strapOrmTexture
) => {
  const strapMaterial = new THREE.MeshStandardMaterial({
    map: strapBaseColorTexture,
    normalMap: strapNormalTexture,
    aoMap: strapOrmTexture,
    roughnessMap: strapOrmTexture,
    metalnessMap: strapOrmTexture,
  });

  strapBaseColorTexture.flipY = false;
  strapNormalTexture.flipY = false;
  strapOrmTexture.flipY = false;

  return strapMaterial;
};
