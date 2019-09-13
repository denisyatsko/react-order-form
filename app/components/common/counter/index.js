// Core
import React, { Component } from 'react';

// Instruments
import styles from './styles.css';

export default class Count extends Component {
  state = {
    count: 0
  };

  _onClickHandler = (value) => {
    const { id, _mergeState } = this.props;

    this.setState((prevState) => ({
      count: (prevState.count + value >= 0 && prevState.count + value < 100)
        ? prevState.count + value
        : prevState.count
    }), () => {
      let state = {[id]: this.state.count};

      _mergeState('order', state);
    });
  };

  render() {
    const {
      labeltext,
      count
    } = this.props;

    return (
      <div className={styles.item}>
        <span className={styles.title}>{labeltext}</span>
        <div className={styles.countWrapper}>
          <button
            type='button'
            onClick={() => this._onClickHandler(-1)}
          >&#8722;</button>
          <span>{count}</span>
          <button
            type='button'
            onClick={() => this._onClickHandler(1)}
          >&#43;</button>
        </div>
      </div>
    );
  }
}
