// Core
import React, { Component } from 'react';
import Formsy from 'formsy-react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { FormsyInput, UserPhoneInput, Preloader } from 'components/common/export';
import { SidebarPartnerCode, SidebarStatistics } from 'components/layout/export';

// Instruments
import { config } from 'config';
import UserAPI from 'api/user/UserAPI';
import { formsyInputsRules, compareObjects } from 'instruments/export';
import { UpdateRequest, ChangePasswordRequest } from 'api/user/requests';

// Styles
import styles from './styles.css';
import main from '../styles.css';

@withProfile
export class Profile extends Component {
  state = {
    isLoadingUpdateUserButton: false,
    isLoadingUpdatePasswordButton: false,
  };

  _submitUserForm = (model) => {
    const { state, _setState, _showCustomPopup } = this.props;

    if (compareObjects(model, state.user)) {
      this.setState({ isLoadingUpdateUserButton: true });

      (new UserAPI).update(new UpdateRequest({ ...state.user, ...model })).then(data => {
        _setState({ user: data.user });
        _showCustomPopup(config.updateInfoText.user);
      }).catch((error) => {
        _showCustomPopup(error);
      }).then(() => this.setState({ isLoadingUpdateUserButton: false }));
    }
  };

  _onInvalidSubmitUserForm = (model) => {
    const { customerName: { name: customerName } } = formsyInputsRules;

    this.userForm.updateInputsWithError(
      { [customerName]: (!model[customerName] && formsyInputsRules.defaultError) || null },
      true,
    );
  };

  _submitPasswordForm = (model) => {
    const { _showCustomPopup } = this.props;

    this.setState({ isLoadingUpdatePasswordButton: true });

    (new UserAPI).changePassword(new ChangePasswordRequest(model)).then(() => {
      _showCustomPopup(config.updateInfoText.password);
    }).catch((error) => {
      _showCustomPopup(error);
    }).then(() => {
      this.passwordForm.reset();
      this.setState({ isLoadingUpdatePasswordButton: false });
    });
  };

  _onInvalidSubmitPasswordForm = (model) => {
    if (!Object.values(model).every(item => item === undefined || item === '')) {
      const {
        currentPassword: { name: currentPassword },
        newPassword: { name: newPassword },
        confirmPassword: { name: confirmPassword },
      } = formsyInputsRules;

      this.passwordForm.updateInputsWithError(
        {
          [currentPassword]: (!model[currentPassword] && formsyInputsRules.defaultError) || null,
          [newPassword]: (!model[newPassword] && formsyInputsRules.defaultError) || null,
          [confirmPassword]: (!model[confirmPassword] && formsyInputsRules.defaultError) || null,
        },
        true,
      );
    } else {
      this.passwordForm.reset();
    }
  };

  render() {
    const { state } = this.props;
    const { isLoadingUpdateUserButton, isLoadingUpdatePasswordButton } = this.state;

    const preloaderJSX =
      <div style={{ textAlign: 'center' }}>
        <Preloader size={40}/>
      </div>;

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <h1 className={main.pageTitle}>Editing personal data</h1>
          <p>Your personal information , which you can change at any time</p>
          <div>
            <span className='itemTitle'>Your e-mail</span>
            <p>{state.user.email}</p>
          </div>
          <Formsy
            ref={element => this.userForm = element}
            onValidSubmit={this._submitUserForm}
            onInvalidSubmit={this._onInvalidSubmitUserForm}
            noValidate
          >
            <div className={styles.twoColContainer}>
              <div>
                <FormsyInput
                  {...formsyInputsRules.customerName}
                  value={(state.user.customer_name !== '') ? state.user.customer_name : null}
                />
              </div>
              <div>
                <UserPhoneInput
                  {...formsyInputsRules.UserPhoneInput}
                  value={(state.user.phone !== '') ? state.user.phone : null}
                />
              </div>
            </div>
            {isLoadingUpdateUserButton
              ? preloaderJSX
              : (
                <button
                  className={`btn btn--primary ${styles.submitButton}`}
                  type='submit'
                  formNoValidate
                >Update user
                </button>
              )
            }
          </Formsy>
          <Formsy
            ref={element => this.passwordForm = element}
            onValidSubmit={this._submitPasswordForm}
            onInvalidSubmit={this._onInvalidSubmitPasswordForm}
            noValidate
          >
            <div className={styles.passwordContainer}>
              <div className={styles.pasCol}>
                <FormsyInput {...formsyInputsRules.currentPassword}/>
              </div>
              <div className={styles.pasCol}>
                <FormsyInput {...formsyInputsRules.newPassword}/>
              </div>
              <div className={styles.pasCol}>
                <FormsyInput {...formsyInputsRules.confirmPassword}/>
              </div>
            </div>
            {isLoadingUpdatePasswordButton
              ? preloaderJSX
              : (
                <button
                  className={`btn btn--primary ${styles.submitButton}`}
                  type='submit'
                  formNoValidate
                >Update password
                </button>
              )
            }
          </Formsy>
        </div>
        <div className={main.sidebar}>
          <SidebarStatistics/>
          <SidebarPartnerCode/>
        </div>
      </div>
    );
  }
}
