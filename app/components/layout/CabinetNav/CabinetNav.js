// Core
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// Instruments
import styles from './styles.css';
import { cabinetRoutes, routes } from 'instruments';

export const CabinetNav = () => {
  const { ORDERS, DISCOUNTS, PROFILE, EARN_CASH } = cabinetRoutes;
  const { ORDER_FORM } = routes;

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
    <div className={`${styles.menu}`}>
      {NavLinks.map(({ to, name }, index) =>
        <NavLink
          activeClassName={styles.active}
          className={styles.navItem}
          key={index}
          id={name}
          to={to}>
          {name}
        </NavLink>,
      )}
      <Link to={ORDER_FORM} className={styles.navItem}>New Order + </Link>
    </div>
  );
};
