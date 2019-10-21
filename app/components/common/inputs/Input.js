// Core
import React from 'react';

// Styles
import styles from './styles.css';

export const Input = (props) => {
  const { name, labeltext } = props;

  return (
    <div className={styles.item}>
      {(!!labeltext) ? (
        <label
          className={styles.title}
          htmlFor={name}>
          {labeltext}
        </label>
      ) : (
        ''
      )}
      <input {...props}/>
    </div>
  );
};
