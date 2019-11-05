// Core
import React, { Component } from 'react';
import Formsy from 'formsy-react';

// Components
import { withProfile } from 'components/HOC/withProfile';
import { FormsyInput, UserPhoneInput } from 'components/common/export';
import { SidebarPartnerCode, SidebarStatistics } from 'components/layout/export';

// Instruments
import { formsyInputsRules } from 'instruments/export';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';
import main from '../styles.css';

@withProfile
export class Profile extends Component {
  _getPasswordValue = (model) => {
    return model.currentPassword || model.newPassword || model.confirmPassword;
  };

  _onInvalidSubmit = (...args) => {
    alert('onInvalidSubmit');
    let model = args[0];
    let validatePassword = this._getPasswordValue(model);

    let customerNameValue = (!model.customer_name && formsyInputsRules.defaultError) || null;
    let currentPasswordVal = validatePassword
      ? !model.currentPassword && formsyInputsRules.defaultError
      : null;
    let newPasswordValue = validatePassword
      ? !model.newPassword && formsyInputsRules.defaultError
      : null;
    let confirmPasswordVal = validatePassword
      ? !model.confirmPassword && formsyInputsRules.defaultError
      : null;

    this.refs.form.updateInputsWithError(
      {
        customer_name: customerNameValue,
        currentPassword: currentPasswordVal,
        newPassword: newPasswordValue,
        confirmPassword: confirmPasswordVal,
      },
      true,
    );
  };

  _submit = (model) => {
    alert('submit');

    let passwordValues = this._getPasswordValue(model);

    if (typeof passwordValues !== 'undefined' && passwordValues !== '') {
      return this._onInvalidSubmit(model);
    }
  };

  render() {
    const { state } = this.props;

    return (
      <div className={main.contentWrapper}>
        <div className={main.mainContent}>
          <h1 className={main.pageTitle}>Editing personal data</h1>
          <p>Your personal information , which you can change at any time</p>
          <Formsy
            ref='form'
            onValidSubmit={this._submit}
            onInvalidSubmit={this._onInvalidSubmit}
            noValidate
          >
            <div className={styles.twoColContainer}>
              <div>
                <FormsyInput
                  {...formsyInputsRules.customerName}
                  value={(state.order.customer_name !== '') ? state.order.customer_name : null}
                />
              </div>
              <div>
                <UserPhoneInput
                  {...formsyInputsRules.UserPhoneInput}
                  value={(state.order.customer_phone !== '') ? state.order.customer_phone : null}
                />
              </div>
            </div>
            <div className={`${styles.border} ${styles.twoColContainer}`}>
              <div>
                <div className={styles.item}>
                  <span className={styles.itemTitle}>Your e-mail</span>
                  <p className={styles.pseudoInput}>{state.user.email}</p>
                </div>
              </div>
              <div>
                <FormsyInput {...formsyInputsRules.currentPassword}/>
              </div>
            </div>
            <div className={styles.twoColContainer}>
              <div>
                <FormsyInput {...formsyInputsRules.newPassword}/>
              </div>
              <div>
                <FormsyInput {...formsyInputsRules.confirmPassword}/>
              </div>
            </div>
            <button
              className={`btn btn--primary ${grid.mAuto}`}
              type='submit'
              formNoValidate
            >
              Update
            </button>
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
