// Core
import React from 'react';

import styles from './styles.css';

const Checkbox = (props) => {
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

export default Checkbox;
