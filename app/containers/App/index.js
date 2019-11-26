// Core
import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

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
import { PaySolidGateRequest } from 'api/payment/requests';
import { AuthController } from 'core/export';
import {
  routes,
  calculatePrice,
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
          app: data.app,
        }, () => {
          this._setPrice();
          this._setCustomerData();
        },
      );
    });
  }

  _setCustomerData = () => {
    new AuthAPI().retrieve().then(data => {
      this.setState(prevState => ({
        user: data.user,
        auth: true,
        order: {
          ...prevState.order,
          ...{
            customer_name: data.user.customer_name,
            phone: data.user.phone,
          },
        },
      }));
    }).catch(() => {
      const { history } = this.props;

      history.push(routes.LOGIN);
    });
  };

  _setDefaultOrderValues = () => {
    const { formValues, user } = this.state;

    this.setState({
      order: {
        ...new DefaultOrderValues(formValues),
        customer_name: user.customer_name || null,
        phone: user.phone || null,
      },
    }, () => {
      this._setPrice();
    });
  };

  _mergeState = (object) => {
    Object.entries(object).forEach(([key, value]) => {
      this.setState(prevState => ({
          [key]: {
            ...prevState[key],
            ...value,
          },
        }), () => this._setPrice(),
      );
    });
  };

  _setState = (object) => {
    Object.entries(object).forEach(([key, value]) => {
      this.setState({ [key]: value });
    });
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
      isVisiblePayButton: isAvailablePayButton(
        +subject_or_discipline.value,
        deadline.value,
        number_of_pages * spacing),
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

  _payHandler = (data) => {
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
  };

  _logOut = () => {
    const { history } = this.props;

    history.push(routes.LOGIN);

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
    const { isLoading } = this.state;

    return (
      <Catcher>
        <Provider
          value={{
            state: this.state,
            _logOut: () => this._logOut(),
            _message: (value) => this._message(value),
            _setState: (object) => this._setState(object),
            _mergeState: (object) => this._mergeState(object),
            _setDefaultOrderValues: () => this._setDefaultOrderValues(),
            _showCustomPopup: content => this._showCustomPopup(content),
            _mergeOrderOptions: (name, value) => this._mergeOrderOptions(name, value),
            _payHandler: (data, isFreeInquiry) => this._payHandler(data, isFreeInquiry),
          }}>
          {isLoading ? (
            <div className='absoluteCenter'>
              <Preloader/>
            </div>
          ) : (
            <div className={styles.mainContent}>
              <Header/>
              <div className={grid.container}>
                <div className={styles.mainSection}>
                  <div className={styles.pageWrapper}>
                    <LastLocationProvider>
                      <Switch location={location}>
                        <Route path={routes.ORDER_FORM} component={OrderForm}/>
                        <Route path={routes.CABINET} component={Cabinet}/>
                        <Route path={routes.LOGIN} exact component={Login}/>
                      </Switch>
                    </LastLocationProvider>
                  </div>
                </div>
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
