// Core
import React from 'react';

// Styles
import styles from './styles.css';

export const Input = (props) => {
  const { labeltext, name, error, success, ...inputProps } = props;

  const className = error
    ? `${styles.error}`
    : success && `${styles.success}`;

  return (
    <div className={styles.item}>
      {(!!labeltext) ? (
        <label
          className='itemTitle'
          htmlFor={name}>
          {labeltext}
        </label>
      ) : (
        ''
      )}
      <input
        id={name}
        className={className || ''}
        {...inputProps}
      />
      <span className={styles.errorMessage}>{error}</span>
    </div>
  );
};
