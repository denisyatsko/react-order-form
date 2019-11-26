// Core
import React, { useState, useEffect } from 'react';

// Instruments
import { config } from 'config';

// Styles
import styles from './styles.css';

export const Counter = (props) => {
  const { labeltext, count } = props;

  const [countValue, setCount] = useState(count);

  const handleClick = (value) => {
    if (count + value >= 0 && count + value < config.maxCountValue)
      setCount(countValue + value);
  };

  useEffect(() => {
    const { id, _mergeState } = props;

    if (countValue !== count)
      _mergeState({ order: { [id]: countValue } });
  }, [countValue]);

  return (
    <div className={styles.item}>
      <span className='itemTitle'>{labeltext}</span>
      <div className={styles.countWrapper}>
        <button
          type='button'
          onClick={() => handleClick(-1)}
        >&#8722;</button>
        <span>{count}</span>
        <button
          type='button'
          onClick={() => handleClick(1)}
        >&#43;</button>
      </div>
    </div>
  );
};
