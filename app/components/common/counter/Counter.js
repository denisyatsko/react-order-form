// Core
import React, { useState, useEffect } from 'react';

// Styles
import styles from './styles.css';

export const Counter = (props) => {
  const { labeltext, count } = props;

  const [countValue, setCount] = useState(count);

  const handleClick = (value) => {
    if (countValue + value >= 0 && countValue + value < 100) setCount(countValue + value);
  };

  useEffect(() => {
    const { id, _mergeState } = props;

    _mergeState('order', {[id]: countValue});

  }, [countValue]);

  return (
    <div className={styles.item}>
      <span className={styles.title}>{labeltext}</span>
      <div className={styles.countWrapper}>
        <button
          type='button'
          onClick={() => handleClick(- 1)}
        >&#8722;</button>
        <span>{count}</span>
        <button
          type='button'
          onClick={() => handleClick( 1)}
        >&#43;</button>
      </div>
    </div>
  );
};
