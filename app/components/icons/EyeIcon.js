// Core
import React from 'react';
import InlineSVG from 'svg-inline-react';

export const EyeIcon = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.48 98.48">
        <g>
        \t<path d="M97.204,45.788c-0.865-1.02-21.537-24.945-47.963-24.945c-26.427,0-47.098,23.925-47.965,24.946
        \t\tc-1.701,2-1.701,4.902,0.001,6.904c0.866,1.02,21.537,24.944,47.964,24.944c26.426,0,47.098-23.926,47.964-24.946
        \t\tC98.906,50.691,98.906,47.789,97.204,45.788z M57.313,35.215c1.777-0.97,4.255,0.143,5.534,2.485
        \t\tc1.279,2.343,0.875,5.029-0.902,5.999c-1.776,0.971-4.255-0.143-5.535-2.485C55.132,38.871,55.535,36.185,57.313,35.215z
        \t\t M49.241,68.969c-18.46,0-33.995-14.177-39.372-19.729c3.631-3.75,11.898-11.429,22.567-16.021
        \t\tc-2.081,3.166-3.301,6.949-3.301,11.021c0,11.104,9.001,20.105,20.105,20.105s20.106-9.001,20.106-20.105
        \t\tc0-4.072-1.219-7.855-3.3-11.021C76.715,37.812,84.981,45.49,88.612,49.24C83.235,54.795,67.7,68.969,49.241,68.969z"/>
        </g>
      </svg>`;

  return <InlineSVG style={{ width: '15px', height: '15px' }} src={svg}/>;
};
