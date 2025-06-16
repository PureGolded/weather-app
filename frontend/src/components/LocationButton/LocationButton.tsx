import React from 'react';
import './LocationButton.css';

interface LocationButtonProps {
  onLocationRequest: () => void;
  loading: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationRequest, loading }) => {
  return (
    <button 
      className="location-button"
      onClick={onLocationRequest}
      disabled={loading}
    >
      <span className="location-icon">📍</span>
      Use My Location
    </button>
  );
};

export default LocationButton;
