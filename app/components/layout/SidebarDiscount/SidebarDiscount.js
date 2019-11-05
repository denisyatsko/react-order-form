// Core
import React from 'react';

// Styles
import styles from './styles.css';

export const SidebarDiscount = (props) => {
  const { finishedOrdersAmount, discount } = props;

  return (
    <div className={styles.wrapper}>
      <p className={styles.caption}>Your discount</p>
      <p className={styles.text}>You have {finishedOrdersAmount} finished orders and your discount is</p>
      <div className={styles.discountContainer}>
        <p className={styles.discount}>
          <span className={styles.discountText}>Lifetime discount</span>
          {discount}
        </p>
      </div>
    </div>
  );
};
