// // Core
import React from 'react';

// // Instruments
import styles from '../styles.css';

class Index extends React.Component {
  render() {
    const { name, labeltext } = this.props;

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
        <input {...this.props}/>
      </div>
    );
  }
}

export default Index;
