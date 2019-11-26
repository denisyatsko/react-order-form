// Core
import React from 'react';

// Styles
import styles from '../inputs/styles.css';

export const Textarea = (props) => {
  const { name, labeltext } = props;

  return (
    <div className={styles.item}>
      {!!labeltext && (
        <label
          className='itemTitle'
          htmlFor={name}>
          {labeltext}
        </label>
      )}
      <textarea
        id={name}
        {...props}
      />
    </div>
  );
};
