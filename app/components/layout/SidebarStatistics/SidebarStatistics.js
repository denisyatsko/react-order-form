// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from './styles.css';

@withProfile
export class SidebarStatistics extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <p className={styles.caption}>Quick stats</p>
        <p className={styles.subTitle}>Your personal statistics</p>
        <div className={styles.row}>
          <span className={styles.title}>Friends orders</span>
          <span>0</span>
        </div>
        <div className={styles.row}>
          <span className={styles.title}>Friends spent</span>
          <span>0</span>
        </div>
        <div className={styles.row}>
          <span className={styles.title}>Cashed out</span>
          <span>0</span>
        </div>
        <div className={styles.row}>
          <span className={styles.title}>Pending</span>
          <span>0</span>
        </div>
        <div className={styles.borderTop}>
          <div className={styles.totalBg}>
            <span className={styles.totalText}>Total:</span>
            <span className={styles.totalValue}>$0</span>
          </div>
        </div>
        <div>
          <button type='button' className={`btn btn--primary ${styles.actionBtn}`}>Withdraw My Cash</button>
          <span className={styles.message}>Needs to be at least 50$</span>
        </div>
      </div>
    );
  }
}
