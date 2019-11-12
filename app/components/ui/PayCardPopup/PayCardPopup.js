// Core
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { withRouter } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { Preloader } from 'components/common/export';

// Styles
import styles from './styles.css';

@withRouter
@withProfile
export class PayCardPopup extends Component {
  state = {
    isLoading: true,
  };

  _closeModal = () => {
    this.props._setState({ payCardPopup: false });
  };

  _payRedirect = () => {
    const { history, state: { payCardPopup } } = this.props;

    history.push(payCardPopup.redirect);

    this._closeModal();
  };

  _onLoadHandler = () => {
    const { payCardPopup } = this.props.state;

    if (payCardPopup.iframeURL) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading } = this.state;
    const { payCardPopup } = this.props.state;

    const buttonClassName = (payCardPopup.declinedButton)
      ? `btn--accent`
      : payCardPopup.approvedButton && `btn--primary`;

    return (
      <Popup
        className='payCardPopup'
        open={payCardPopup.isVisible}
        onClose={this._closeModal}
        modal
        closeOnDocumentClick>
        <div className={styles.payCardPopup}>
          <div className={styles.info}>
            <span className={styles.orderText}>Order #{payCardPopup.id}</span>
            <span className={styles.priceText}>${payCardPopup.price}</span>
          </div>
          {isLoading && <div className={styles.preloaderContainer}><Preloader/></div>}
          <iframe
            className={styles.paymentIframe}
            src={payCardPopup.iframeURL}
            onLoad={this._onLoadHandler}
          />
          {(buttonClassName) && (
            <button
              type='button'
              onClick={this._payRedirect}
              className={`btn ${buttonClassName} ${styles.iframeButton}`}
            >
              ok
            </button>
          )}
        </div>
      </Popup>
    );
  }
}
