// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from '../styles.css';

@withProfile
export class LoggedUser extends Component {
  render() {
    const { _setOrderFormStep } = this.props;

    return (
      <div className={styles.loggedContent}>
        <p>
          You are logged in. Please proceed to payment using the link below.
        </p>
        <button
          type='button'
          className='btn btn--primary'
          onClick={() => _setOrderFormStep(2)}>
          Continue
        </button>
      </div>
    );
  }
}
