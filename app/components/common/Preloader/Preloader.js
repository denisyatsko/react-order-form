// Core
import React from 'react';

// Instruments
import spinner from 'assets/images/spinner.svg';

// Styles
import styles from './styles.css';

export const Preloader = () => {
  return <img className={styles.preloader} src={spinner} alt='preloader'/>;
};
