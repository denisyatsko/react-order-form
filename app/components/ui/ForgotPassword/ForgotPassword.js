// Core
import React, { Component } from 'react';
import Popup from 'reactjs-popup';

// Components
import { FormsyInput, Preloader } from 'components/common/export';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import { config } from 'config';
import AuthAPI from 'api/auth/AuthAPI';
import { formsyInputsRules } from 'instruments/export';
import { ForgotPasswordRequest } from 'api/auth/requests';

// Styles
import styles from './styles.css';

@withProfile
export class ForgotPassword extends Component {
  state = {
    isVisiblePopup: false,
    isLoading: false,
  };

  _setPopupState = state => {
    this.setState({ isVisiblePopup: state });
  };

  _resetPassword = () => {
    const { emailForResetPassword } = this.refs;
    const { _showCustomPopup } = this.props;

    let email = emailForResetPassword.getValue();

    if (emailForResetPassword.isValid()) {
      this.setState({
        isLoading: true,
      });

      new AuthAPI().forgot(new ForgotPasswordRequest(email)).then(() => {
        _showCustomPopup(config.resetPasswordText.success);
      }).catch(() => {
        _showCustomPopup(config.resetPasswordText.error);
      }).then(() => {
        this.setState({
          isLoading: false,
          isVisiblePopup: false,
        });
      });
    } else {
      emailForResetPassword.setState({
        externalError: (!email && [formsyInputsRules.defaultError]) || null,
      });
    }
  };

  render() {
    const { isVisiblePopup, isLoading } = this.state;

    const openPopup = () => this._setPopupState(true);
    const closePopup = () => this._setPopupState(false);

    return (
      <>
        <button
          type='button'
          className={styles.loginLink}
          onClick={openPopup}
        >
          Forgot Password?
        </button>
        <Popup
          modal
          className='resetPassword'
          closeOnDocumentClick
          open={isVisiblePopup}
          onClose={closePopup}
        >
          <div className={styles.popupContent}>
            <p>Request reset password</p>
            <FormsyInput {...formsyInputsRules.emailForResetPassword}/>
            {!isLoading ? (
              <button
                type='button'
                onClick={this._resetPassword}
                className='btn btn--primary'>
                Submit
              </button>
            ) : (
              <Preloader/>
            )}
          </div>
        </Popup>
      </>
    );
  }
}
