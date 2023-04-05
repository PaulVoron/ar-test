import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import { QRCodeSVG } from 'qrcode.react';
import Backpack from './components/Backpack';
import ColorButtons from './components/ColorButtons';
import MaterialButtons from './components/MaterialButtons';
import MetallButtons from './components/MetallButtons';

const App = () => {
  const group = useRef();
  const [color, setColor] = useState('#8B4513');
  const [material, setMaterial] = useState('leather');
  const [metall, setMetall] = useState('silver');
  const [isArVisible, setIsArVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const colors = [['#8B4513', 'brown'], ['#393535', 'black'], ['#12569b', 'blue']];
  const materials = ['leather', 'fabric', 'denim'];
  const metalls = ['silver', 'gold', 'black'];

  const backpack = useLoader(
    GLTFLoader,
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/backpack.glb',
    );
  
  useEffect(() => {
    setIsLoading(false);
  }, [backpack]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleMaterialChange = (newMaterial) => {
    setMaterial(newMaterial);
  };

  const handleMetallChange = (newMetall) => {
    setMetall(newMetall);
  };

  const handleARButtonClick = () => {
    setIsArVisible(true);
  };

  const handleBackButtonClick = () => {
    setIsArVisible(false);
  };

  return (
   <>
      <div className="title">Choose your backpack in WebAR</div>

      <div className="controls_container">
        <ColorButtons
          colors={colors}
          onColorChange={handleColorChange}
        />

        <MaterialButtons
          materials={materials}
          onMaterialChange={handleMaterialChange}
        />

        <MetallButtons
          metalls={metalls}
          onMetallChange={handleMetallChange}
        />
      </div>

      <div className="body_container">
        {isArVisible && (
          <div className="canvas">
              <Backpack 
                backpack={backpack}
                color={color}
                material={material}
                metall={metall}
                isArVisible={isArVisible} 
              />
          </div>
        )}

        {!isArVisible && (
          <>
            <div className="canvas">
              {isLoading && (
                <h2>Loading...</h2>
              )}
              {!isLoading && (
                <Canvas camera={{ position: [0.35, 0.2, 0.35] }}>
                  <OrbitControls />

                  <ambientLight intensity={0.7} />

                  <directionalLight position={[14, 12, 25]} intensity={1} />

                  <group ref={group}>
                    <Backpack 
                      backpack={backpack}
                      color={color}
                      material={material}
                      metall={metall}
                      isArVisible={isArVisible} 
                    />
                  </group>
                </Canvas>
              )}
            </div>

            <div className="qr_container">
              <div> Try it on mobile</div>

              <div className="qr_box">
                <QRCodeSVG value="https://paulvoron.github.io/ar-test/" />
              </div>
            </div>

            <div className="ar_container">
              <div> Try it in AR</div>

              <button
                className="ar_button"
                onClick={handleARButtonClick}
              >
                AR
              </button>
            </div>
          </>
        )}
      </div>
      
      {isArVisible &&
        <button
          className="ar_button ar_button--back"
          onClick={handleBackButtonClick}
        >
          Back to web
        </button>
      }

      <p>Developed by Pavlo Voronin, 2023</p>
    </>
  )
}

export default App
