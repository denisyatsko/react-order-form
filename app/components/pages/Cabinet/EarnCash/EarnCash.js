// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { SidebarPartnerCode, SidebarStatistics } from 'components/layout/export';

// Styles
import styles from './styles.css';
import main from '../styles.css';

@withProfile
export class EarnCash extends Component {
  render() {
    const { state } = this.props;

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <h1 className={main.pageTitle}>My referral program</h1>
          <p>Make Money Through Your Friends Network</p>
          <div className={styles.content}>
            <div className={styles.col}>
              <div className={styles.maxWidth}>
                <p>EssayHomework account holder? Invite your friends
                  by giving them 12% discount code, promote our website
                  and earn 10% of each friend’s order price with us.</p>
                <h2 className={styles.title}>Are you a social magnet?</h2>
                <p>Earn some money by telling your friends about EssayHomeworkHelp</p>
                <h2 className={styles.title}>Get started by copying your Partner code:
                  <span className={styles.code}>{state.user.partner_code}</span>
                </h2>
                <p>Share your unique code through blog posts, articles,
                  emails, Facebook posts and tweets or just send it to
                  your friend. You’ll get paid 10% of the price for every
                  new friend’s order. Help your friends to become
                  eligible for a 12% discount on their first order now.</p>
              </div>
              <div className={styles.rightCol}>
                <p className={styles.cerlce}>10%</p>
                <span>For every new<br/> friend`s order</span>
              </div>
            </div>
          </div>
        </div>
        <div className={main.sidebar}>
          <SidebarStatistics/>
          <SidebarPartnerCode/>
        </div>
      </div>
    );
  }
};
