// Core
import React from 'react';

// Styles
import styles from './styles.css';

export const RadioCheckbox = (props) => {
  const { name, values, state, _mergeState } = props;

  return (
    <div className={styles.item}>
      <div className={styles.col}>
        <span className='itemTitle'>{name}</span>
        <div
          className={`${styles.radioLeft} ${state === 1 ? styles.active : ''}`}
          onClick={() => _mergeState(1)}>
          {Object.keys(values)[0]}
        </div>
      </div>
      <div className={styles.col}>
        <span className='itemTitle'>
          {state === 1 ? Object.values(values)[0] : Object.values(values)[1]}
        </span>
        <div
          className={`${styles.radioRight} ${state === 2 ? styles.active : ''}`}
          onClick={() => _mergeState(2)}>
          {Object.keys(values)[1]}
        </div>
      </div>
    </div>
  );
};
