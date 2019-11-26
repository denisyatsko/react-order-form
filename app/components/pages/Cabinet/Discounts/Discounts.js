// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { SidebarDiscount, SidebarStatistics } from 'components/layout/export';

// Instruments
import src from 'assets/images/discount-img.png';
import OrderAPI from 'api/orders/OrderAPI';

// Styles
import styles from './styles.css';
import main from '../styles.css';

@withProfile
export class Discounts extends Component {
  state = {
    finishedOrdersAmount: 5
  };

  render() {
    const { state } = this.props;
    const { finishedOrdersAmount } = this.state;

    let discount = state.user.discount;
    let discountGraduateWidth = finishedOrdersAmount * 4;

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <h1 className={main.pageTitle}>Lifetime discount privileges</h1>
          <p>Save money by Getting Lifetime Discounts<br/>
            At EssayHomeworkHelp we elaborated a handy discounts system for out returned customers . We
            genuelybelieve that experience with our service should not limit to 1 purchase only , as you are woth
            of highest quality papers all the way along your study.</p>
          <div className={styles.imgContainer}>
            <img src={src} alt='discount img'/>
          </div>
          <div className={styles.userDiscountContainer}>
            <h2 className={styles.title}>Your discount {discount}</h2>
            <div className={styles.flex}>
              <div className={styles.titles}>
                <span>Discount:</span>
                <span>Orders:</span>
              </div>
              <div className={styles.graduateContainer}>
                <div className={`${styles.between} ${styles.percents}`}>
                  <div className={styles.col}>
                    <span>0%</span>
                  </div>
                  <div className={styles.col}>
                    <span>5%</span>
                    <span className={styles.order}>5 orders</span>
                  </div>
                  <div className={styles.col}>
                    <span>10%</span>
                    <span className={styles.order}>15 orders</span>
                  </div>
                  <div className={styles.col}>
                    <span>15%</span>
                    <span className={styles.order}>25+ orders</span>
                  </div>
                </div>
                <div className={styles.graduate}>
                  <div style={{ width: `${discountGraduateWidth}%` }} className={styles.bg}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={main.sidebar}>
          <SidebarStatistics/>
          <SidebarDiscount
            finishedOrdersAmount={finishedOrdersAmount}
            discount={discount}
          />
        </div>
      </div>
    );
  }
}
