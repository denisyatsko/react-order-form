// Core
import React from 'react';
import InlineSVG from 'svg-inline-react';

export const LogOutIcon = () => {
  const svg = `<svg viewBox="0 0 551.13 551.13" xmlns="http://www.w3.org/2000/svg"><path d="m435.616 160.051-24.354 24.354 73.937 73.937h-244.08v34.446h244.08l-73.937 73.937 24.354 24.354 115.514-115.514z"/><path d="m378.902 516.685h-344.456v-482.239h344.456v34.446h34.446v-51.669c0-9.52-7.703-17.223-17.223-17.223h-378.902c-9.52 0-17.223 7.703-17.223 17.223v516.684c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-51.668h-34.446z"/></svg>`;

  return <InlineSVG style={{ width: '15px', height: '15px' }} src={svg}/>;
};
