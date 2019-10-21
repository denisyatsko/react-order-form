// Core
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from './styles.css';

@withProfile
export class OrderFormNav extends Component {
  render() {
    const { routes, state } = this.props;
    const authUser = JSON.parse(state.auth);
    const handleOnClick = (e) => !authUser && e.preventDefault();

    return (
      <div className={styles.nav}>
        {routes.map((route, index) => (
          <NavLink
            key={route.path}
            to={route.path}
            activeClassName={styles.active}
            className={`${styles.navItem} ${!authUser ? styles.disabled : ''}`}
            onClick={handleOnClick}
            exact
          >
            <span>{`0${index + 1}`}</span>&nbsp;{route.name}
          </NavLink>
        ))}
      </div>
    );
  }
}
