// Core
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { LogOutIcon } from 'components/icons/export';

// Instruments
import styles from './styles.css';
import { cabinetRoutes, routes } from 'instruments/export';

@withProfile
export class CabinetNav extends Component {
  _orderNowHandler = () => {
    const { _setDefaultOrderValues } = this.props;

    _setDefaultOrderValues();
    this._toggleMenu();
  };

  _toggleMenu = () => {
    const { _setState } = this.props;

    _setState('visibleMobileMenu', false);
  };

  render() {
    const { _logOut, state: { visibleMobileMenu } } = this.props;
    const { ORDERS, DISCOUNTS, PROFILE, EARN_CASH } = cabinetRoutes;

    const handlerOnClick = () => _logOut();

    const NavLinks = [
      {
        to: ORDERS,
        name: 'My orders',
      },
      {
        to: PROFILE,
        name: 'Profile',
      },
      {
        to: DISCOUNTS,
        name: 'Discount',
      },
      {
        to: EARN_CASH,
        name: 'Earn Cash',
      },
    ];

    return (
      <div className={`${styles.menu} ${visibleMobileMenu && styles.on}`}>
        {NavLinks.map(({ to, name }, index) =>
          <NavLink
            onClick={this._toggleMenu}
            activeClassName={styles.active}
            className={styles.navItem}
            key={index}
            id={name}
            to={to}>
            {name}
          </NavLink>,
        )}
        <button
          type='button'
          onClick={handlerOnClick}
          className={styles.logOut}
        >
          <LogOutIcon/>
          log out
        </button>
        <Link
          onClick={this._orderNowHandler}
          to={routes.ORDER_FORM}
          className={`btn btn--accent ${styles.orderBtn}`}
        >
          Order Now
        </Link>
      </div>
    );
  }
}
