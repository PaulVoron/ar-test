import React from 'react';

const MetallButtons = ({ metalls, onMetallChange }) => {
  return (
    <div className="metall-buttons">
      <div>Metall</div>
      {metalls.map(metall => (
        <button
          key={metall}
          className={`button button--${metall}`}
          title={metall}
          onClick={() => onMetallChange(metall)}
        />
      ))}
    </div>
  );
};

export default MetallButtons;
