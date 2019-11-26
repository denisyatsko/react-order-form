// Core
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Instruments
import { orderFormRoutes } from 'instruments/export';

// Styles
import styles from '../styles.css';

@withRouter
export class LoggedUser extends Component {
  render() {
    const { history } = this.props;

    const clickHandler = () => history.push(orderFormRoutes.STEP_2);

    return (
      <div className={styles.loggedContent}>
        <p>
          You are logged in. Please proceed to payment using the link below.
        </p>
        <button
          type='button'
          className='btn btn--primary'
          onClick={clickHandler}
        >
          Continue
        </button>
      </div>
    );
  }
}
