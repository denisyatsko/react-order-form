// Core
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Components
import { LogOutButton, MobileMenu } from 'components/ui/export';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import logo from 'assets/images/logo-Header.png';
import { routes, cabinetRoutes } from 'instruments/export';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

@withRouter
@withProfile
export class Header extends Component {
  render() {
    const { state, location } = this.props;
    const isLoggedIn = JSON.parse(state.auth);
    const userName = state.user.customer_name || 'customer_name';
    const cabinetLocation = (location.pathname).includes(routes.CABINET);

    return (
      <header className={styles.header}>
        <div className={grid.container}>
          <div className={styles.content}>
            {cabinetLocation && <div className={styles.mobMenu}><MobileMenu/></div>}
            <a href='#' className={styles.logo}><img src={logo} alt='logo'/></a>
            {isLoggedIn ? (
              <div className={styles.btnWrapper}>
                <Link to={cabinetRoutes.ORDERS} className={styles.userLink}>{userName}</Link>
                <div className={cabinetLocation ? styles.logOutBtn : ''}><LogOutButton/></div>
              </div>
            ) : (
              <Link to={routes.LOGIN} className={`btn btn--accent ${styles.logInBtn}`}>Log In</Link>
            )}
          </div>
        </div>
      </header>
    );
  }
}
