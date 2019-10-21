// Core
import React from 'react';
import InlineSVG from 'svg-inline-react';

export const DialogArrow = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 33.575093">
        <g>
          <path
           d="m 0,31.24 c 0,0 17.35,0 27.76,-31.24 L 59,13.88 c 0,0 -27.76,27.77 -59,17.36 z"/>
        </g>
      </svg>`;

  return <InlineSVG style={{ width: '15px', height: '15px' }} src={svg}/>;
};
