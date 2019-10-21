// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import { LogOutButton, MobileMenu } from 'components/ui/export';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import logo from 'images/logo-Header.png';
import { routes, cabinetRoutes } from 'instruments';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

@withProfile
export class Header extends Component {
  render() {
    const { state } = this.props;
    const { LOGIN } = routes;
    const { ORDERS } = cabinetRoutes;
    const isLoggedIn = JSON.parse(state.auth);
    const userName = state.customer_name || 'customer_name';

    return (
      <header className={styles.header}>
        <div className={grid.container}>
          <div className={styles.content}>
            <MobileMenu/>
            <a href='#' className={styles.logo}><img src={logo} alt='logo'/></a>
            {isLoggedIn ? (
              <div className={styles.btnWrapper}>
                <Link to={ORDERS} className={styles.userLink}>{userName}</Link>
                <LogOutButton/>
              </div>
            ) : (
              <Link to={LOGIN} className='btn btn--accent'>Log In</Link>
            )}
          </div>
        </div>
      </header>
    );
  }
}
