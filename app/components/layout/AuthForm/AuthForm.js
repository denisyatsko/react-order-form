// Core
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { withRouter } from 'react-router-dom';

// Components
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { ForgotPassword } from 'components/ui/export';
import { withProfile } from 'components/HOC/withProfile';
import { Checkbox, FormsyInput, Preloader } from 'components/common/export';

// Instruments
import AuthAPI from 'api/auth/AuthAPI';
import { AuthController } from 'core/export';
import { RegisterRequest } from 'api/auth/requests';
import {
  routes,
  AuthState,
  LoginState,
  orderFormRoutes,
  formsyInputsRules,
} from 'instruments/export';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

@withRouter
@withProfile
export class AuthForm extends Component {
  state = {
    serverError: '',
    isLoading: false,
  };

  _showErrorMessage = data => {
    this.setState({
      serverError: data,
    });
  };

  _submit = model => {
    const { authState } = this.props;

    this.setState({ isLoading: true });

    const promise = authState === AuthState
      ? new AuthAPI().register(new RegisterRequest(model))
      : authState === LoginState && new AuthAPI().login(new RegisterRequest(model));

    promise.then(data => {
      const { result_code } = data;
      const { history, _mergeState, _setState, state, _setTypeAuth } = this.props;

      switch (result_code) {
        case 'OK':
          const { auth_token, customer_name, phone } = data.user;

          _setState({ auth: true });

          _mergeState({
            user: data.user,
            order: {
              customer_name: customer_name,
              customer_phone: phone,
            },
          });

          new AuthController().setToken(auth_token, state.rememberMe);

          history.location.pathname === routes.LOGIN
            ? history.push(routes.CABINET)
            : history.push(orderFormRoutes.STEP_2);

          break;

        case 'DUPLICATE':
          _setTypeAuth(LoginState);
          this._showErrorMessage(data.errors);

          break;

        default:
          throw data.errors;
      }
    }).catch(error => this._showErrorMessage(error))
      .then(() => this.setState({ isLoading: false }));
  };

  _onInvalidSubmit = (model) => {
    const { form } = this.refs;

    form.updateInputsWithError(
      {
        email: (!model.email && formsyInputsRules.defaultError) || null,
        password: (!model.password && formsyInputsRules.defaultError) || null,
      },
      true,
    );
  };

  render() {
    const { isLoading, serverError } = this.state;
    const { _setState, state, _setTypeAuth, authState = AuthState } = this.props;

    const handlerOnChangeCheckbox = () => _setState({ rememberMe: !state.rememberMe });
    const setLoginState = event => _setTypeAuth(LoginState, event);

    return (
      <Formsy
        ref='form'
        onValidSubmit={this._submit}
        onInvalidSubmit={this._onInvalidSubmit}
        noValidate
      >
        <div className={styles.content}>
          <div className={grid.centerCol}>
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
          <FormsyInput {...formsyInputsRules.email} value={state.user.email}/>
          <FormsyInput {...formsyInputsRules.password}/>
          <div className={grid.flexBetween}>
            {authState === LoginState ? (
              <ForgotPassword/>
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
          <div className={styles.serverErrorContainer}>
            <p className={styles.serverError}>{serverError}</p>
          </div>
          <div className={styles.loginBtnContainer}>
            {!isLoading ? (
              <button
                className={`btn btn--primary ${grid.mAuto}`}
                type='submit'
                formNoValidate>
                {authState.btnText}
              </button>
            ) : (
              <Preloader/>
            )}
          </div>
        </div>
      </Formsy>
    );
  }
}
