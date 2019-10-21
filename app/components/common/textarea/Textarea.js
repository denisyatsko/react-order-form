// Core
import React from 'react';

// Styles
import styles from '../inputs/styles.css';

export const Textarea = (props) => {
  const { name, labeltext, placeholder, onChange } = props;

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
      <textarea
        className={styles.textarea}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
