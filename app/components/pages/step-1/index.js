// Core
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import Popup from 'reactjs-popup';

// Components
import Checkbox from 'components/common/checkbox';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { withProfile } from 'components/HOC/withProfile';
import FormsyInput from 'components/common/inputs/formsyInput';

// Instruments
import AuthAPI from 'api/auth';
import { cookies, LoginState, AuthState } from 'instruments';
import { RegisterRequest, ForgotPasswordRequest } from 'api/auth/request';

import styles from '../styles.css';

@withProfile
export default class Step_1 extends Component {
  state = {
    authState: {},
    serverError: '',
  };

  _showErrorMessage = data => {
    this.setState({
      serverError: data,
    });
  };

  _onFocus = () => {
    this.setState({
      serverError: '',
    });
  };

  _setTypeAuth = (type, event) => {
    event && event.preventDefault();

    this.setState({ authState: type });
  };

  componentDidMount() {
    this.setState({
      authState: !(
        cookies.get('email') === null || cookies.get('email') === undefined
      )
        ? LoginState
        : AuthState,
    });
  }

  _authSwitch = promise => {
    const { _setStep, _mergeState, _setAuth, state } = this.props;

    promise.then(data => {
      const code = data.result_code;

      switch (code) {
        case 'OK':
          const TOKEN = data.user.auth_token;

          _setStep(2);
          _setAuth(true);
          _mergeState('user', data.user);
          _mergeState('order', {
            customer_name: data.user.customer_name,
            customer_phone: data.user.phone,
          });

          if (state.rememberMe === true)
            cookies.set('email', data.user.email, { path: '/' });

          cookies.set('TOKEN', TOKEN, { path: '/' });

          break;

        case 'DUPLICATE':
          this._setTypeAuth('loginState');
          this._showErrorMessage(data.errors);

          break;

        default:
          console.log(`result_code: ${code}`);

          this._showErrorMessage(data.errors);
      }
    });
  };

  _logInHandler = data => {
    const promise = new AuthAPI().login(new RegisterRequest(data));

    this._authSwitch(promise);
  };

  _signUpHandler = data => {
    const promise = new AuthAPI().register(new RegisterRequest(data));

    this._authSwitch(promise);
  };

  _submit = model => {
    this.state.authState === AuthState
      ? this._signUpHandler(model)
      : this._logInHandler(model);
  };

  _onInvalidSubmit = () => {
    this.refs.form.updateInputsWithError(
      {
        password:
          (!this.refs.passwordInput.getValue() && 'This field is required') ||
          null,
        email:
          (!this.refs.emailInput.getValue() && 'This field is required') ||
          null,
      },
      true,
    );
  };

  _resetPassword = () => {
    const value = this.refs.resetPasswordInput.getValue();

    if (this.refs.resetPasswordInput.isValid())
      new AuthAPI().forgot(new ForgotPasswordRequest(value));
  };

  render() {
    const { authState } = this.state;
    const { _setState, state } = this.props;

    return (
      <Formsy
        ref="form"
        onValidSubmit={this._submit}
        onInvalidSubmit={this._onInvalidSubmit}
        noValidate
      >
        <div className={styles.authTab}>
          <div
            onClick={event => this._setTypeAuth(AuthState, event)}
            className={` ${styles.btn} ${
              authState === AuthState ? styles.active : ''
            } `}
          >
            I am a new customer
          </div>
          <div
            onClick={event => this._setTypeAuth(LoginState, event)}
            className={` ${styles.btn} ${
              authState === LoginState ? styles.active : ''
            } `}
          >
            I have an account
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.col50}>
            <FormsyInput
              ref="emailInput"
              name="email"
              type="email"
              placeholder="E-mail"
              validations="isEmail"
              labeltext="Your e-mail"
              validationError="This is not a valid email"
              onFocus={this._onFocus}
              value={state.user.email}
              required
            />
            <FormsyInput
              ref="passwordInput"
              name="password"
              type="password"
              placeholder="Password"
              labeltext="Password"
              validations={{ minLength: 5 }}
              validationError="This is not a valid password"
              onFocus={this._onFocus}
              required
            />
            <div className={styles.flexBetween}>
              {authState === LoginState ? (
                <Popup
                  trigger={
                    <button type="button" className={styles.loginLink}>
                      Forgot Password?
                    </button>
                  }
                  modal
                  className="resetPassword"
                  closeOnDocumentClick
                >
                  <div className={styles.popupContent}>
                    <p>Request reset password</p>
                    <FormsyInput
                      ref="resetPasswordInput"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      validations="isEmail"
                      validationError="This is not a valid email"
                      required
                    />
                    <button
                      type="button"
                      onClick={this._resetPassword}
                      className=" btn btn--primary "
                    >
                      Submit
                    </button>
                  </div>
                </Popup>
              ) : (
                <button
                  type="button"
                  onClick={event => this._setTypeAuth(LoginState, event)}
                  className={styles.loginLink}
                >
                  Already Registered
                </button>
              )}
              <Checkbox
                state={state.rememberMe}
                text="Remember me"
                onChange={() => {
                  _setState('rememberMe', !state.rememberMe);
                }}
              />
            </div>
            <p className={styles.serverError}>{this.state.serverError}</p>
            <button
              className={`btn btn--primary ${styles.signUpBtn}`}
              type="submit"
              formNoValidate
            >
              {authState.text}
            </button>
          </div>
          <div className={styles.col50}>
            <button className={`btn ${styles.socialBtn} ${styles.facebook} `}>
              <FaFacebookF /> {authState.text} with facebook
            </button>
            <button className={`btn ${styles.socialBtn} ${styles.google} `}>
              <FaGoogle /> {authState.text} with google
            </button>
          </div>
        </div>
      </Formsy>
    );
  }
}
