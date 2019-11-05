// Core
import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Components
import { CabinetNav } from 'components/layout/export';
import { withProfile } from 'components/HOC/withProfile';
import { Discounts, EarnCash, Profile, OrdersList, Order } from 'components/pages/export';

// Instruments
import { cabinetRoutes } from 'instruments/export';

// Styles
import styles from './styles.css';

@withRouter
@withProfile
class Cabinet extends Component {
  render() {
    const { ORDERS, ORDER, DISCOUNTS, PROFILE, EARN_CASH } = cabinetRoutes;
    const routes = [
      {
        path: DISCOUNTS,
        Component: Discounts,
      },
      {
        path: ORDERS,
        Component: OrdersList,
      },
      {
        path: PROFILE,
        Component: Profile,
      },
      {
        path: EARN_CASH,
        Component: EarnCash,
      },
      {
        path: `${ORDER}/:orderId`,
        Component: Order,
      },
      {
        path: '*',
        render: () => <Redirect to={ORDERS}/>,
      },
    ];

    return (
      <Route render={({ location }) => (
        <div className={styles.container}>
          <CabinetNav/>
          <TransitionGroup className={styles.mainContent}>
            <CSSTransition key={location.pathname} classNames='fade' timeout={300} appear>
              <div className={styles.page}>
                <Switch location={location}>
                  {routes.map(({ path, Component, render }, index) =>
                    <Route key={index} path={path} component={Component} render={render}/>,
                  )}
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}/>
    );
  }
}

export default Cabinet;
