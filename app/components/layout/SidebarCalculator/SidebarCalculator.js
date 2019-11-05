// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { Counter, Dropdown } from 'components/common/export';

// Instruments
import { config } from 'config';
import { routes } from 'instruments/export';

// Styles
import styles from './styles.css';

@withProfile
export class SidebarCalculator extends Component {
  render() {
    const { state, _mergeState } = this.props;

    return (
      <div className={styles.wrapper}>
        <p className={styles.caption}>Place your order</p>
        <Dropdown
          options={state.formValues.type_of_paper}
          labeltext='Type of paper'
          onChange={(value) => _mergeState('order', { type_of_paper: value })}
          value={state.order.type_of_paper}
          searchable={false}
          placeholder='Select essay type'
        />
        <Dropdown
          options={state.formValues.academic_level}
          value={state.order.academic_level}
          placeholder='Select academic level'
          labeltext='Academic level'
          searchable={false}
          onChange={(value) => _mergeState('order', { academic_level: value })}
        />
        <Dropdown
          options={state.formValues.deadline}
          labeltext='Deadline'
          searchable={false}
          value={state.order.deadline}
          onChange={(value) => (value.label === '0 days')
            ? _mergeState('order', {
              deadline: {
                label: '0 days',
                value: config.defaultDeadline * 3600,
              },
            })
            : _mergeState('order', { deadline: value })}
        />
        <Counter
          id='number_of_pages'
          labeltext='Number of pages'
          count={state.order.number_of_pages}
          _mergeState={_mergeState}
        />
        <div className={styles.totalBg}>
          <span className={styles.totalText}>Total:</span>
          <span className={styles.totalValue}>${state.order.price}</span>
        </div>
        <Link to={routes.ORDER_FORM} className='btn btn--accent'>Continue</Link>
      </div>
    );
  }
}
