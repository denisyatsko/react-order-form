// Core
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

// Instruments
import styles from './styles.css';

export default class PayCardPopup extends Component {
  state = {
    isOpen: false,
    test: true,
  };

  // _closeModal = () => {
  //   this.setState({
  //     isOpen: false,
  //   });
  // };
  //
  // _setOpenState = (value) => {
  //   this.setState({
  //     isOpen: value,
  //   });
  // };

  render() {
    const { orderId, price, iframeURL, isOpen, _closeModal } = this.props;

    return (
      <Popup
        className="payCardPopup"
        open={isOpen}
        // onClose={_closeModal}
        modal
        closeOnDocumentClick
      >
        <div className={styles.payCardPopup}>
          <div className={styles.info}>
            <span className="">Order #{orderId}</span>
            <span className="">${price}</span>
          </div>
          <iframe className={styles.paymentIframe} src={iframeURL}></iframe>
        </div>
      </Popup>
    );
  }
}
