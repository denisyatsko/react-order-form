// Core
import React from 'react';

// Styles
import styles from './styles.css';

export const Checkbox = (props) => {
  const { text, state, onChange } = props;

  return (
    <label className={styles.checkbox}>
      <input
        type='checkbox'
        checked={state}
        onChange={onChange}
      />
      <span className={styles.customCheckbox}></span>
      <span>{ text }</span>
    </label>
  );
};
