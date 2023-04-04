import './App.css'
import React, { useEffect, useRef, useState } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei'
import Backpack from './components/Backpack';
import {QRCodeSVG} from 'qrcode.react';

function App() {
  const group = useRef();
  const [color, setColor] = useState('#8B4513');
  const [material, setMaterial] = useState('leather');
  const [metall, setMetall] = useState('silver');
  const [isArVisible, setIsArVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const backpack = useLoader(
    GLTFLoader,
    'https://myassetsfordev.s3.eu-north-1.amazonaws.com/backpack.glb',
    );
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleMaterialhange = (newMaterial) => {
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
        <div className="color-buttons">
          <div>Color</div>
          <button
            className="button"
            style={{ backgroundColor: '#8B4513' }}
            title="Brown"
            onClick={() => handleColorChange('#8B4513')}
          />
          
          <button
            className="button"
            style={{ backgroundColor: '#393535' }}
            title="Black"
            onClick={() => handleColorChange('#393535')}
          />
          
          <button
            className="button"
            style={{ backgroundColor: '#12569b' }}
            title="Blue"
            onClick={() => handleColorChange('#12569b')}
          />
        </div>

        <div className="material-buttons">
          <div>Material</div>
          <button
            className="button button--leather"
            title="Leather"
            onClick={() => handleMaterialhange('leather')}
          />

          <button
            className="button button--fabric"
            title="Fabric"
            onClick={() => handleMaterialhange('fabric')}
          />

          <button
            className="button button--denim"
            title="Denim"
            onClick={() => handleMaterialhange('denim')}
          />
        </div>

        <div className="metall-buttons">
          <div>Metall</div>
          <button
            className="button button--silver"
            title="Silver"
            onClick={() => handleMetallChange('silver')}
          />

          <button
            className="button button--gold"
            title="Gold"
            onClick={() => handleMetallChange('gold')}
          />
            
          <button
            className="button button--black"
            title="Black"
            onClick={() => handleMetallChange('black')}
          />
        </div>
      </div>

      <div className="body_container">
        {isArVisible && (
          <div className="canvas">
              <Backpack backpack={backpack} color={color} material={material} metall={metall} isArVisible={isArVisible} />
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
                  <Backpack backpack={backpack} color={color} material={material} metall={metall} isArVisible={isArVisible} />
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
              <button className="ar_button" onClick={handleARButtonClick}>AR</button>
            </div>
          </>
        )}
      </div>
      
      {isArVisible &&
        <button className="ar_button ar_button--back" onClick={handleBackButtonClick}>Back to web</button>
      } 
      <p>Developed by Pavlo Voronin, 2023</p>
    </>
  )
}

export default App
