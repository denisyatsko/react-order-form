// Core
import React, { Component } from 'react';

// Components
import Catcher from 'components/Catcher';
import Form from 'components/layout/form';
import Header from 'components/layout/header';
import { withRouter } from 'react-router-dom';
import Preloader from 'components/ui/preloader';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import MainAPI from 'api/main';
import AuthAPI from 'api/auth';
import { RetrieveRequest } from 'api/auth/request';
import { calculatePrice, cookies } from 'instruments';
import styles from './styles.css';

@withRouter
export default class App extends Component {
  state = {
    user: {
      email: '',
    },
    formValues: {},
    pricingValues: {},
    order: {
      type_of_paper: '',
      academic_level: '',
      paper_format: '',
      deadline: '',
      subject_or_discipline: '',
      spacing: 1,
      number_of_pages: 1,
      number_of_sources: 0,
      number_of_slides: 0,
      number_of_charts: 0,
      paper_details: '',
      customer_name: '',
      customer_phone: '',
      preferred_writer: '',
      discount_code: '',
      topic: '',
      advanced_writer_required: '',
      digital_copies_required: '',
      additional_editing_required: '',
      plagiarism_report_required: '',
      initial_draft_required: '',
      one_page_summary_required: '',
      extended_revision_period_required: '',
      vip_support_required: '',
      price: '',
      files: [],
    },
    step: !sessionStorage.step ? 1 : parseInt(sessionStorage.step),
    auth: !sessionStorage.auth ? false : JSON.parse(sessionStorage.auth),
    rememberMe: true,
    isLoading: true,
  };

  componentDidMount() {
    new MainAPI().getOrderFormSetup().then(data => {
      const {
        type_of_paper,
        academic_level,
        subject_or_discipline,
        paper_format,
        deadline,
      } = data.ui;

      this.setState(
        prevState => ({
          formValues: data.ui,
          pricingValues: data.pricing,
          order: {
            ...prevState.order,
            ...{ type_of_paper: type_of_paper[18] },
            ...{ academic_level: academic_level[1] },
            ...{ subject_or_discipline: subject_or_discipline[0] },
            ...{ paper_format: paper_format[0] },
            ...{ deadline: deadline[0] },
          },
          isLoading: false,
        }),
        () => this._setPrice(),
      );
    });

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
  }

  _mergeState = (name, selectValues) =>
    this.setState(
      prevState => ({
        [name]: {
          ...prevState[name],
          ...selectValues,
        },
      }),
      () => this._setPrice(),
    );

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
    sessionStorage.setItem('step', value);
    this.setState({ step: value });

    switch (value) {
      case 1:
        this.props.history.push('/step_1');
        break;
      case 2:
        this.props.history.push('/step_2');
        break;
      case 3:
        this.props.history.push('/step_3');
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

  _logOut = () => {
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
    return (
      <Catcher>
        <Provider
          value={{
            state: this.state,
            _logOut: () => this._logOut(),
            _setStep: value => this._setStep(value),
            _setAuth: value => this._setAuth(value),
            _setState: (name, value) => this._setState(name, value),
            _mergeState: (name, value) => this._mergeState(name, value),
          }}
        >
          {this.state.isLoading ? (
            <div className="preloaderWrapper">
              <Preloader />
            </div>
          ) : (
            <div className={styles.mainContent}>
              <Header />
              <Form />
            </div>
          )}
        </Provider>
      </Catcher>
    );
  }
}
