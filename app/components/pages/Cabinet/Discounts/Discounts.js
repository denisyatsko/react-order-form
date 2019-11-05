// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { SidebarDiscount, SidebarStatistics } from 'components/layout/export';

// Instruments
import src from 'images/discount-img.png';
import { getOrders } from 'instruments/export';

// Styles
import styles from './styles.css';
import main from '../styles.css';

@withProfile
export class Discounts extends Component {
  componentDidMount() {
    const { state, _setState } = this.props;

    if (!state.userOrders) {
      getOrders().then(data => {
        _setState('userOrders', data.results);
      });
    }
  }

  render() {
    const { state } = this.props;

    let finishedOrdersAmount = 5;
    let discount = state.user.discount;
    let discountGraduateWidth = finishedOrdersAmount*4;

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
                <div className={styles.percents}>
                  <span>0%</span>
                  <span>5%</span>
                  <span>10%</span>
                  <span>15%</span>
                </div>
                <div style={{ width: `${discountGraduateWidth}%` }} className={styles.graduate}/>
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
