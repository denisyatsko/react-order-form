// Core
import React from 'react';

// Instruments
import spinner from 'images/spinner.svg';
import styles from './styles.css';

let Preloader = () => {
  return <img className={styles.preloader} src={spinner} alt='preloader'/>;
};

export default Preloader;
