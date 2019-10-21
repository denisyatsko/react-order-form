// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from './styles.css';

@withProfile
export class SidebarOrderInfo extends Component {
  render() {
    const { order } = this.props.state;

    return (
      <div className={styles.wrapper}>
        <p className={styles.caption}>Order Info</p>
        <div className={styles.content}>
          <div className={styles.row}>
            <span className={styles.title}>Type</span>
            <span>{order.type_of_paper.label}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Level</span>
            <span>{order.academic_level.label}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Deadline</span>
            <span>{order.deadline.label}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Pages</span>
            <div>
              <span>{order.number_of_pages}</span>
              <span>({order.spacing === 1 ? 'Double' : 'Single'})</span>
            </div>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Paper format</span>
            <span>{order.paper_format.label}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Sources</span>
            <span>{order.number_of_sources}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Slides</span>
            <span>{order.number_of_slides}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Charts</span>
            <span>{order.number_of_charts}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Discount</span>
            <span>{order.discount_code || 'none'}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.totalText}>Total:</span>
            <span className={styles.totalValue}>${order.price}</span>
          </div>
        </div>
      </div>
    );
  }
}
