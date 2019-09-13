// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import styles from '../styles.css';

@withProfile
class LoggedUser extends Component {
  render() {
    return (
      <div className={styles.authContent}>
        <p>
          You are logged in. Please proceed to payment using the link below.
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => this.props._setStep(2)}
        >
          Continue
        </button>
      </div>
    );
  }
}

export default LoggedUser;
