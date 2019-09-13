// Core
import React, { Component } from 'react';
import { fromTo } from 'gsap';
import { Route, Redirect } from 'react-router-dom';
import { Transition, CSSTransition } from 'react-transition-group';

// Components
import NavBar from 'components/layout/navBar';
import Step_1 from 'components/pages/step-1';
import Step_2 from 'components/pages/step-2';
import Step_3 from 'components/pages/step-3';
import LoggedUser from 'components/pages/loggedUser';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import styles from './styles.css';

@withProfile
class Form extends Component {
  _animateNavBarEnter = NavBar => {
    fromTo(
      NavBar,
      1,
      { opacity: 0, rotationX: 150 },
      { opacity: 1, rotationX: 0 },
    );
  };

  render() {
    const isLoggedIn = JSON.parse(this.props.state.auth);
    const firstPageComponent = isLoggedIn ? LoggedUser : Step_1;
    const firstPage = isLoggedIn ? '/loggedUser' : '/step_1';

    const routes = [
      { path: firstPage, name: 'Autorize', Component: firstPageComponent },
      { path: '/step_2', name: 'Paper details', Component: Step_2 },
      { path: '/step_3', name: 'Options', Component: Step_3 },
    ];

    const transitionStepOptions = {
      classNames: {
        appear: styles.stepAppear,
        appearDone: styles.stepAppearDone,
        enter: styles.stepInStart,
        enterActive: styles.stepInEnd,
        exit: styles.stepOutStart,
        exitActive: styles.stepOutEnd,
        exitDone: styles.stepOutDone,
      },
      timeout: {
        enter: 500,
        exit: 400,
      },
    };

    return (
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <Transition
            appear
            in
            timeout={1000}
            onEnter={this._animateNavBarEnter}
          >
            <NavBar routes={routes} />
          </Transition>

          <div className={styles.overflowHidden}>
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    {...transitionStepOptions}
                    unmountOnExit
                  >
                    <Component />
                  </CSSTransition>
                )}
              </Route>
            ))}
            {!isLoggedIn ? <Redirect to='/step_1' /> : null}

          </div>
        </div>
      </div>
    );
  }
}

export default Form;
