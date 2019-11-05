// Core
import React from 'react';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

export const SolidGate = () => {
  return (
    <>
      <div className={styles.payWrapper}>
        <button
          className={styles.payBtn}
          type='submit'
          formNoValidate>
        </button>
        <div className={grid.justifyContentCenter}>
          <span className={styles.solidIcon1}></span>
          <span className={styles.solidIcon2}></span>
          <span className={styles.solidIcon3}></span>
          <span className={styles.solidIcon4}></span>
        </div>
      </div>
    </>
  )
};
