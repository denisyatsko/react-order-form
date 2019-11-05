// Core
import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

// Components
import { AuthForm } from 'components/layout/export';

// Instruments
import { orderFormRoutes, LoginState } from 'instruments/export';

// Styles
import styles from '../OrderForm/styles.css';

export const Login = () => {
  return (
    <CSSTransition classNames='fade' timeout={300} appear>
      <div className={styles.firstStepForm}>
        <div className={styles.container}>
          <div className={styles.col50}>
            <AuthForm authState={LoginState}/>
          </div>
          <div className={styles.col50}>
            <div className={styles.content}>
              <p className={styles.rightColTitle}>Place your first order to register in our system</p>
              <Link className='btn btn--accent' to={orderFormRoutes.STEP_1}>Place an order</Link>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
