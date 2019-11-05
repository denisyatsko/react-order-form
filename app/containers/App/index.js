// Core
import React, { Component } from 'react';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Components
import Cabinet from 'containers/Cabinet';
import Catcher from 'components/Catcher';
import OrderForm from 'containers/OrderForm';
import { Login } from 'components/pages/export';
import { Header } from 'components/layout/export';
import { Preloader } from 'components/common/export';
import { Provider } from 'components/HOC/withProfile';
import { CustomPopup, PayCardPopup } from 'components/ui/export';

// Instruments
import MainAPI from 'api/main/MainAPI';
import AuthAPI from 'api/auth/AuthAPI';
import PaymentAPI from 'api/payment/PaymentAPI';
import { cabinetRoutes } from 'instruments/export';
import { RetrieveRequest } from 'api/auth/requests';
import { PaySolidGateRequest } from 'api/payment/requests';
import {
  routes,
  calculatePrice,
  AuthController,
  orderFormRoutes,
  redirectPayError,
  DefaultOrderValues,
  isAvailablePayButton,
} from 'instruments/export';

// Styles
import styles from './styles.css';
import grid from 'theme/grid.css';

@withRouter
export default class App extends Component {
  state = {
    user: {},
    formValues: {},
    pricingValues: {},
    order: {},
    uploadRequirements: {},
    auth: false,
    rememberMe: true,
    isLoading: true,
    userOrders: null,
    visibleMobileMenu: false,
    customPopup: {
      isVisible: false,
      message: null,
    },
    payCardPopup: false,
  };

  componentDidMount() {
    new MainAPI().getOrderFormSetup().then(data => {
      this.setState({
          formValues: data.ui,
          pricingValues: data.pricing,
          order: new DefaultOrderValues(data.ui),
          uploadRequirements: data.order.uploadRequirements,
          isLoading: false,
        }, () => {
          this._setPrice();
          this._setCustomerData();
        },
      );
    });
  }

  _setCustomerData = () => {
    const { history } = this.props;
    const TOKEN = new AuthController().getToken();

    if (TOKEN) {
      new AuthAPI().retrieve(new RetrieveRequest(TOKEN))
        .then(data => {
          const { user } = data;

          this.setState(prevState => ({
            user,
            auth: true,
            order: {
              ...prevState.order,
              ...{
                customer_name: user.customer_name,
                customer_phone: user.phone,
              },
            },
          }));
        });
    } else {
      history.push(routes.LOGIN);
    }
  };

  _setDefaultOrderValues = () => {
    const { formValues, user } = this.state;

    this.setState({
      order: {
        ...new DefaultOrderValues(formValues),
        customer_name: user.customer_name || null,
        customer_phone: user.phone || null,
      },
    }, () => {
      this._setPrice();
    });
  };

  _mergeState = (name, selectValues) => {
    this.setState(prevState => ({
        [name]: {
          ...prevState[name],
          ...selectValues,
        },
      }), () => this._setPrice(),
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
    const { subject_or_discipline, deadline, number_of_pages, spacing } = this.state.order;

    this.setState(prevState => ({
      isVisiblePayButton: isAvailablePayButton(+subject_or_discipline.value, deadline.value, number_of_pages * spacing),
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

  _setOrderFormStep = value => {
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

  _setState = (name, value) => {
    this.setState({ [name]: value });
  };

  _showCustomPopup = (content) => {
    this.setState({
      customPopup: {
        isVisible: true,
        message: content,
      },
    });
  };

  _message = (msg) => {
    let order = this.state.payCardPopup.id;

    if (order) {
      if (order.indexOf('/') !== -1) {
        let arr_order = order.split('/');
        order = arr_order[0];
      }

      if (msg.data.type === 'orderStatus') {
        switch (msg.data.response.order.status) {
          case 'declined':
            this.setState(prevState => ({
              payCardPopup: {
                ...prevState.payCardPopup,
                ...{
                  declinedButton: true,
                  approvedButton: false,
                  redirect: redirectPayError.declined,
                },
              },
            }));
            break;

          case 'approved':
            this.setState(prevState => ({
              payCardPopup: {
                ...prevState.payCardPopup,
                ...{
                  declinedButton: false,
                  approvedButton: true,
                  redirect: redirectPayError.approved,
                },
              },
            }));
            break;
        }
      }
    }
  };

  _payHandler = (data = null, isFreeInquiry = false) => {
    const { history } = this.props;

    if (isFreeInquiry) {
      return history.push(cabinetRoutes.ORDERS);
    } else {
      this.setState({
        payCardPopup: {
          price: data.price,
          id: data.id,
          isVisible: true,
        },
      });

      return (new PaymentAPI).solidGate(new PaySolidGateRequest(data)).then(data => {
        this.setState(prevState => ({
          payCardPopup: {
            ...prevState.payCardPopup,
            ...{ iframeURL: data.paymentResult.pay_form.form_url },
          },
        }));
      });
    }
  };

  _logOut = () => {
    const { history } = this.props;

    history.push('/');

    new AuthController().removeToken();

    this._setDefaultOrderValues();

    this.setState({
      auth: false,
      visibleMobileMenu: false,
      user: {},
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
            _message: (value) => this._message(value),
            _payHandler: (data, isFreeInquiry) => this._payHandler(data, isFreeInquiry),
            _setState: (name, value) => this._setState(name, value),
            _setOrderFormStep: value => this._setOrderFormStep(value),
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
              <PayCardPopup/>
            </div>
          )}
        </Provider>
      </Catcher>
    );
  }
}
