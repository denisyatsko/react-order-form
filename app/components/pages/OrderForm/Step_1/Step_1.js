// Core
import React, { Component } from 'react';
import { TimelineLite } from 'gsap';

// Components
import { AuthForm } from 'components/layout/export';
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import { LoginState, AuthState } from 'instruments/export';

// Styles
import styles from '../styles.css';

@withProfile
export class Step_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: AuthState,
    };
    this.formWrapper = null;
    this.infoColumn = null;
    this.infoColumnAnimateToLogin = null;
    this.infoColumnAnimateToRegister = null;
  }

  _setTypeAuth = (type, event) => {
    event && event.preventDefault();
    this.setState({ authState: type });
    type === LoginState && this.infoColumnAnimateToLogin.restart();
    type === AuthState && this.infoColumnAnimateToRegister.restart();
  };

  componentDidMount() {
    this.infoColumnAnimateToLogin = new TimelineLite({ paused: true })
      .to(this.infoColumn, 0.3, { right: 0, left: 'auto', width: '100%' })
      .to(this.infoColumn, 0.75, { width: '300px' })
      .to(this.formWrapper, 0.5, { marginLeft: 0, marginRight: '300px' }, '-=0.75');

    this.infoColumnAnimateToRegister = new TimelineLite({ paused: true })
      .to(this.infoColumn, 0.3, { left: 0, right: 'auto', width: '100%' })
      .to(this.infoColumn, 0.75, { width: '300px' })
      .to(this.formWrapper, 0.5, { marginRight: 0, marginLeft: '300px' }, '-=0.75');
  }

  render() {
    const { authState } = this.state;

    const handlerToLoginState = (event) => this._setTypeAuth(LoginState, event);
    const handlerToRegisterState = (event) => this._setTypeAuth(AuthState, event);

    authState === LoginState && this.infoColumnAnimateToLogin.play();

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.firstStepContent}>
            <div className={`${styles.navCol}`}
                 ref={div => this.infoColumn = div}>

              {authState === AuthState && (
                <div className={styles.maxWidth}>
                  <p className={styles.title}>Welcome Back!</p>
                  <p>To keep connected with us please
                    login eith your personal info</p>
                  <div
                    className='btn btn--white'
                    onClick={handlerToLoginState}>
                    Log in
                  </div>
                </div>)}

              {authState === LoginState && (
                <div className={styles.maxWidth}>
                  <p className={styles.title}>Hello, Friend!</p>
                  <p>Enter your personal details and start journey with us</p>
                  <div
                    className='btn btn--white'
                    onClick={handlerToRegisterState}>
                    Register
                  </div>
                </div>)}

            </div>
            <div
              ref={div => this.formWrapper = div}
              className={styles.authFormWrapper}>
              <AuthForm
                _setTypeAuth={this._setTypeAuth}
                authState={authState}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
