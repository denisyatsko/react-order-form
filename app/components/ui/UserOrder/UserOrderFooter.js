// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { FolderIcon, MessageIcon } from 'components/icons/export';

// Instruments
import { config } from 'config';
import { cabinetRoutes } from 'instruments/export';

// Styles
import styles from './styles.css';

@withProfile
export class UserOrderFooter extends Component {
  render() {
    const { order, _payHandler } = this.props;

    const orderLink = `${cabinetRoutes.ORDER}/${order.id}`;

    return (
      <div className={styles.bottomContainer}>
        <div className={styles.flexLine}>
          <Link
            to={{
              pathname: `${orderLink}`,
              state: config.orderTabs.tab2,
            }}
            className={`${styles.actionButton} ${styles.lightBlue}`}
          >
            <MessageIcon/>
            &nbsp;&nbsp;Messages&nbsp;&nbsp;
            <span>{order.info_new_messages_amount}</span>
          </Link>
          <Link
            to={{
              pathname: `${orderLink}`,
              state: config.orderTabs.tab3,
            }}
            className={`${styles.actionButton} ${styles.lightBlue} ${styles.marginLeft}`}
          >
            <FolderIcon/>
            &nbsp;&nbsp;Files&nbsp;&nbsp;
            <span>{order.info_new_files_amount}</span>
          </Link>
        </div>
        <div className={styles.flexLine}>
          {
            order.status_general === config.orderStatus.unpaid &&
            <button
              onClick={() => _payHandler(order)}
              className={`${styles.actionButton} ${styles.payButton}`}
            >pay</button>
          }
          <p className={styles.price}>$ {order.price}</p>
        </div>
      </div>
    );
  }
}
