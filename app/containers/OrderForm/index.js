// Core
import React, { Component } from 'react';
import { fromTo } from 'gsap';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Transition, CSSTransition } from 'react-transition-group';
import { withLastLocation } from 'react-router-last-location';

// Components
import { orderFormRoutes } from 'instruments/export';
import { withProfile } from 'components/HOC/withProfile';
import { LoggedUser, Step_1, Step_2, Step_3 } from 'components/pages/export';
import { OrderFormNav, SidebarOrderInfo } from 'components/layout/export';

// Styles
import styles from './styles.css';

@withProfile
@withRouter
@withLastLocation
class OrderForm extends Component {
  _animateNavBarEnter = NavBar => {
    fromTo(
      NavBar,
      1,
      { opacity: 0, rotationX: 150 },
      { opacity: 1, rotationX: 0 },
    );
  };

  componentWillUnmount() {
    const { _setDefaultOrderValues } = this.props;
    _setDefaultOrderValues();
  }

  render() {
    const { state, history, lastLocation } = this.props;
    const { STEP_1, STEP_2, STEP_3, LOGGED_USER } = orderFormRoutes;

    const isLoggedIn = JSON.parse(state.auth);
    const routes = [
      {
        path: isLoggedIn ? LOGGED_USER : STEP_1,
        name: 'Autorize',
        Component: isLoggedIn ? LoggedUser : Step_1,
      },
      {
        path: STEP_2,
        name: 'Paper details',
        Component: Step_2,
      },
      {
        path: STEP_3,
        name: 'Options',
        Component: Step_3,
      },
    ];

    let prevStep = lastLocation && +lastLocation.pathname.split('-').pop() || 1;
    let currentStep = +history.location.pathname.split('-').pop() || 1;

    const transitionStepOptions = {
      classNames: currentStep > prevStep
        ? {
          appear: styles.appear,
          appearDone: styles.appearDone,
          enter: styles.enter,
          enterDone: styles.enterDone,
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
        } : {
          appear: styles.appear,
          enter: styles.nextEnter,
          enterDone: styles.enterDone,
          enterActive: styles.nextEnterActive,
          exitActive: styles.nextExitActive,
        },
      timeout: {
        enter: 500,
        exit: 400,
      },
    };

    return (
      <div className={styles.container}>
        <div className={styles.flexRow}>
          <div className={`${styles.content} ${history.location.pathname !== STEP_1 && styles.overflowHidden}`}>
            <Transition
              appear
              in
              timeout={700}
              onEnter={this._animateNavBarEnter}>
              <OrderFormNav routes={routes}/>
            </Transition>
            <div className={styles.slideContainer}>
              {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                    <CSSTransition
                      in={match != null}
                      {...transitionStepOptions}
                      unmountOnExit
                    >
                      <Component/>
                    </CSSTransition>
                  )}
                </Route>
              ))}
            </div>
            <Redirect to={STEP_2}/>
          </div>
          <SidebarOrderInfo/>
        </div>
      </div>
    );
  }
}

export default OrderForm;
