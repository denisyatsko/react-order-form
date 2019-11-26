// Core
import React from 'react';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Components
import { AuthForm } from 'components/layout/export';

// Instruments
import { orderFormRoutes, LoginState } from 'instruments/export';

// Styles
import styles from '../OrderForm/styles.css';

export const Login = () => {
  const animateHandler = element => {
    fromTo(
      element,
      1,
      { opacity: 0, x: -35 },
      { opacity: 1, x: 0, onComplete: () => element.removeAttribute('style') },
    );
  };

  return (
    <Transition appear in timeout={800} onEnter={animateHandler}>
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
    </Transition>
  );
};
