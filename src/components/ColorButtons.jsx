import React from 'react';

const ColorButtons = ({ colors, onColorChange }) => {
  return (
    <div className="color-buttons">
      <div>Color</div>
      {colors.map(color => (
        <button
          key={color[0]}
          className="button"
          style={{ backgroundColor: color[0] }}
          title={color[1]}
          onClick={() => onColorChange(color[0])}
        />
      ))}
    </div>
  );
};

export default ColorButtons;
