// Core
import React, { Component } from 'react';

// Instruments
import { config } from 'config';
import { userTimeView } from 'instruments/export';

// Styles
import styles from 'components/common/Counter/styles.css';

export class DeadlineCounter extends Component {
  state = {
    count: config.defaultDeadline
  };

  _setDeadline = () => {
    let deadline = this.state.count * 3600;
    let time_ms = new Date(parseInt((deadline*1000) + Math.round(((new Date).getTime()))));
    let ddl_user = userTimeView(time_ms);
    this.setState({
      time: ddl_user
    });
  };

  _onClickHandler = (value) => {
    const { id, _mergeState } = this.props;

    this.setState((prevState) => ({
      count: (prevState.count + value > 0 && prevState.count + value <= 23)
        ? prevState.count + value
        : prevState.count
    }), () => {
      let state = {
        label: '0 days',
        value: this.state.count * 3600
      };
      _mergeState('order', {[id]: state});
      this._setDeadline();
    });
  };

  componentDidMount() {
    this._setDeadline();
  }

  render() {
    const {
      state
    } = this.props;

    return (
      <div className={`${styles.item} ${(state.deadline.value >= 86400) ? styles.disabled : ''}`}>
        <span className={styles.deadlineTitle}>{this.state.time}</span>
        <div className={styles.countWrapper}>
          <button
            type='button'
            onClick={(state.deadline.value < 86400) && (() => this._onClickHandler(-1)) || null}
          >&#8722;</button>
          <span>{`${this.state.count} ${(this.state.count === 1) ? 'hour' : 'hours'}`}</span>
          <button
            type='button'
            onClick={(state.deadline.value < 86400) && (() => this._onClickHandler(1)) || null}
          >&#43;</button>
        </div>
      </div>
    );
  }
}
