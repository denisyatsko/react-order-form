// Core
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import styles from './styles.css';

@withProfile
export default class NavBar extends Component {
  render() {
    const { routes } = this.props;
    const authUser = JSON.parse(this.props.state.auth);

    return (
      <div className={styles.nav}>
        {routes.map((route, index) => (
          <NavLink
            key={route.path}
            to={route.path}
            activeClassName={styles.active}
            className={`${styles.navItem} ${!authUser ? styles.disabled : ''}`}
            onClick={e => !authUser && e.preventDefault()}
            exact
          >
            <span>{`0${index + 1}`}</span>&nbsp;{route.name}
          </NavLink>
        ))}
      </div>
    );
  }
}
