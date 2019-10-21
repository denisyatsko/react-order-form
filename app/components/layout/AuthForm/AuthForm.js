// Core
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import Popup from 'reactjs-popup';
import { withRouter } from 'react-router-dom';

// Components
import { Checkbox, FormsyInput } from 'components/common/export';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import AuthAPI from 'api/auth/AuthAPI';
import { cookies, routes, LoginState, AuthState, orderFormRoutes } from 'instruments';
import { RegisterRequest, ForgotPasswordRequest } from 'api/auth/requests';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

@withRouter
@withProfile
export class AuthForm extends Component {
  state = {
    serverError: '',
  };

  _showErrorMessage = data => {
    this.setState({
      serverError: data,
    });
  };

  _authSwitch = promise => {
    promise.then(data => {
      const { result_code } = data;
      const { CABINET, LOGIN } = routes;
      const { STEP_2 } = orderFormRoutes;
      const { history, _mergeState, _setAuth, state, _setTypeAuth } = this.props;

      switch (result_code) {
        case 'OK':
          const { auth_token, customer_name, phone, email } = data.user;

          _setAuth(true);
          _mergeState('user', data.user);
          _mergeState('order', {
            customer_name: customer_name,
            customer_phone: phone,
          });

          if (state.rememberMe === true)
            cookies.set('email', email, { path: '/' });

          cookies.set('TOKEN', auth_token, { path: '/' });

          history.location.pathname === LOGIN
            ? history.push(CABINET) : history.push(STEP_2);

          break;

        case 'DUPLICATE':
          _setTypeAuth(LoginState);
          this._showErrorMessage(data.errors);

          break;

        default:
          console.log(`result_code: ${result_code}`);

          this._showErrorMessage(data.errors);
      }
    }).catch(error => this._showErrorMessage(error));
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
    const { authState } = this.props;

    authState === AuthState
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
    const { _setState, state, authState, _setTypeAuth } = this.props;

    const handlerOnChangeCheckbox = () => _setState('rememberMe', !state.rememberMe);
    const setLoginState = event => _setTypeAuth(LoginState, event);

    return (
      <Formsy
        ref='form'
        onValidSubmit={this._submit}
        onInvalidSubmit={this._onInvalidSubmit}
        noValidate
        className={styles.firstStepForm}>
        <div className={styles.content}>
          <div className={`${grid.centerCol}`}>
            <h1 className={styles.title}>{authState.title}</h1>
            <div className={grid.justifyContentCenter}>
              <button className={`${styles.socialBtn} ${styles.facebook}`}>
                <FaFacebookF/>
              </button>
              <button className={`${styles.socialBtn} ${styles.google}`}>
                <FaGoogle/>
              </button>
            </div>
          </div>
          <FormsyInput
            ref='emailInput'
            name='email'
            type='email'
            placeholder='E-mail'
            validations='isEmail'
            labeltext='Your e-mail'
            validationError='This is not a valid email'
            onFocus={this._onFocus}
            value={state.user.email}
            required/>
          <FormsyInput
            ref='passwordInput'
            name='password'
            type='password'
            placeholder='Password'
            labeltext='Password'
            validations={{ minLength: 5 }}
            validationError='This is not a valid password'
            onFocus={this._onFocus}
            required/>
          <div className={grid.flexBetween}>
            {authState === LoginState ? (
              <Popup
                trigger={
                  <button type='button' className={styles.loginLink}>
                    Forgot Password?
                  </button>
                }
                modal
                className='resetPassword'
                closeOnDocumentClick>
                <div className={styles.popupContent}>
                  <p>Request reset password</p>
                  <FormsyInput
                    ref='resetPasswordInput'
                    name='email'
                    type='email'
                    placeholder='E-mail'
                    validations='isEmail'
                    validationError='This is not a valid email'
                    required/>
                  <button
                    type='button'
                    onClick={this._resetPassword}
                    className='btn btn--primary'>
                    Submit
                  </button>
                </div>
              </Popup>
            ) : (
              <button
                type='button'
                onClick={setLoginState}
                className={styles.loginLink}>
                Already Registered
              </button>
            )}
            <Checkbox
              state={state.rememberMe}
              text='Remember me'
              onChange={handlerOnChangeCheckbox}/>
          </div>
          <p className={styles.serverError}>{this.state.serverError}</p>
          <button
            className={`btn btn--primary ${styles.signUpBtn} ${grid.mAuto}`}
            type='submit'
            formNoValidate>
            {authState.btnText}
          </button>
        </div>
      </Formsy>
    );
  }
}
