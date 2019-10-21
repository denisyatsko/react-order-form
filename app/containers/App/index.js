// Core
import React, { Component } from 'react';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Components
import Cabinet from 'containers/Cabinet';
import Catcher from 'components/Catcher';
import OrderForm from 'containers/OrderForm';
import { Header } from 'components/layout/export';
import { Preloader, CustomPopup } from 'components/ui/export';
import { Provider } from 'components/HOC/withProfile';
import { Login } from 'components/pages/export';

// Instruments
import MainAPI from 'api/main/MainAPI';
import AuthAPI from 'api/auth/AuthAPI';
import { RetrieveRequest } from 'api/auth/requests';
import { calculatePrice, cookies, orderFormRoutes, routes, DefaultOrderValues } from 'instruments';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

@withRouter
export default class App extends Component {
  state = {
    user: {
      email: '',
    },
    formValues: {},
    pricingValues: {},
    order: {},
    auth: !sessionStorage.auth ? false : JSON.parse(sessionStorage.auth),
    rememberMe: true,
    isLoading: true,
    userOrders: null,
    customPopup: {
      isVisible: false,
      message: null,
    },
  };

  componentDidMount() {
    new MainAPI().getOrderFormSetup().then(data => {
      this.setState({
          formValues: data.ui,
          pricingValues: data.pricing,
          order: new DefaultOrderValues(data.ui),
          isLoading: false,
        },() => {
          this._setPrice();
          this._setCustomerData();
        },
      );
    });
  }

  _setCustomerData = () => {
    if (!!sessionStorage.auth && JSON.parse(sessionStorage.auth) === true) {
      const TOKEN = cookies.get('TOKEN');

      new AuthAPI().retrieve(new RetrieveRequest(TOKEN)).then(data => {
        const { user } = data;

        this.setState(prevState => ({
          user,
          order: {
            ...prevState.order,
            ...{ customer_name: user.customer_name },
            ...{ customer_phone: user.phone },
          },
        }));
      });
    } else if (cookies.get('email')) {
      this.setState({ user: { email: cookies.get('email') } });
    }
  };

  _setDefaultOrderValues = () => {
    const { formValues } = this.state;

    this.setState({
      order: new DefaultOrderValues(formValues),
    }, () => {
      this._setPrice();
      this._setCustomerData();
    });
  };

  _mergeState = (name, selectValues) => {
    this.setState(prevState => ({
        [name]: {
          ...prevState[name],
          ...selectValues,
        },
      }),
      () => this._setPrice(),
    );
  };

  _mergeOrderOptions = (name, selectValues) => {
    this.setState(prevState => ({
      order: {
        ...prevState.order,
        options: {
          ...prevState.order.options,
          ...{ [name]: selectValues },
        },
      },
    }), () => this._setPrice());
  };

  _setPrice = () => {
    this.setState(prevState => ({
      order: {
        ...prevState.order,
        ...{
          price: calculatePrice({
            order: this.state.order,
            pricingValues: this.state.pricingValues,
          }),
        },
      },
    }));
  };

  _setStep = value => {
    const { STEP_1, STEP_2, STEP_3 } = orderFormRoutes;
    const { history } = this.props;

    switch (value) {
      case 1:
        history.push(STEP_1);
        break;
      case 2:
        history.push(STEP_2);
        break;
      case 3:
        history.push(STEP_3);
        break;
    }
  };

  _setAuth = value => {
    sessionStorage.setItem('auth', value);
    this.setState({ auth: value });
  };

  _setState = (name, value) => {
    this.setState({ [name]: value });
  };

  _showCustomPopup = (content) => {
    this.setState({
      customPopup: {
        isVisible: true,
        message: content,
      }
    })
  };

  _logOut = () => {
    const { history } = this.props;

    history.push('/');

    sessionStorage.clear();

    this.setState({
      step: 1,
      auth: false,
      rememberMe: false,
      user: {
        email: cookies.get('email') ? cookies.get('email') : '',
      },
    });
  };

  render() {
    const { location } = this.props;
    const { auth, isLoading } = this.state;

    const isLoggedIn = JSON.parse(auth);

    return (
      <Catcher>
        <Provider
          value={{
            state: this.state,
            _logOut: () => this._logOut(),
            _setStep: value => this._setStep(value),
            _setAuth: value => this._setAuth(value),
            _setState: (name, value) => this._setState(name, value),
            _setDefaultOrderValues: () => this._setDefaultOrderValues(),
            _showCustomPopup: content => this._showCustomPopup(content),
            _mergeState: (name, value) => this._mergeState(name, value),
            _mergeOrderOptions: (name, value) => this._mergeOrderOptions(name, value),
          }}>
          {isLoading ? (
            <div className='preloaderWrapper'>
              <Preloader/>
            </div>
          ) : (
            <div className={styles.mainContent}>
              <Header/>
              <div className={grid.container}>
                <TransitionGroup className={styles.mainSection}>
                  <CSSTransition key={location} classNames='fade' timeout={300} appear>
                    <div className={styles.pageWrapper}>
                      <Switch location={location}>
                        <Route path={routes.ORDER_FORM} component={OrderForm}/>
                        <Route path={routes.CABINET} component={Cabinet}/>
                        <Route path={routes.LOGIN} exact component={Login}/>
                        {!isLoggedIn ? <Redirect to={routes.LOGIN}/> : null}
                      </Switch>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </div>
              <CustomPopup/>
            </div>
          )}
        </Provider>
      </Catcher>
    );
  }
}
