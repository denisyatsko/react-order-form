// Core
import React from 'react';

// Instruments
import spinner from 'assets/images/spinner.svg';

export const Preloader = ({ size = 75 }) => {
  return <img
    style={{
      width: `${size}px`,
      height: `${size}px`,
    }}
    src={spinner}
    alt='preloader'
  />;
};
