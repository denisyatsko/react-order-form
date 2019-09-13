// Core
import React from 'react';

import Input from 'components/common/inputs/regular';
import styles from '../inputs/styles.css';

export default class Textarea extends Input {
  render() {
    const { name, labeltext, placeholder, onChange } = this.props;

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
  }
}
