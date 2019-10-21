// Core
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Styles
import styles from './styles.css';

@withProfile
export class CustomPopup extends Component {
  _closeModal = () => {
    this.props._setState('customPopup', false);
  };

  render() {
    const { message, isVisible } = this.props.state.customPopup;

    return (
      <Popup
        className='resetPassword'
        open={isVisible}
        onClose={this._closeModal}
        modal
        closeOnDocumentClick
      >
        <div className={styles.customPopup}>
          <span className={styles.text}>{message}</span>
        </div>
      </Popup>
    );
  }
}
