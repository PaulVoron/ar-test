import React from 'react';

const MaterialButtons = ({ materials, onMaterialChange }) => {
  return (
    <div className="material-buttons">
      <div>Material</div>
      {materials.map(material => (
        <button
          key={material}
          className={`button button--${material}`}
          title={material}
          onClick={() => onMaterialChange(material)}
        />
      ))}
    </div>
  );
};

export default MaterialButtons;
