// Core
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import Popup from 'reactjs-popup';
import { withRouter } from 'react-router-dom';

// Components
import Preloader from 'components/ui/preloader';
import Counter from 'components/common/counter';
import Dropdown from 'components/common/dropdown';
import Checkbox from 'components/common/checkbox';
import Input from 'components/common/inputs/regular';
import { withProfile } from 'components/HOC/withProfile';
import RadioCheckbox from 'components/common/radioCheckbox';
import UserPhoneInput from 'components/common/inputs/phone';
import DeadlineCounter from 'components/ui/deadlineCounter';
import FormsyInput from 'components/common/inputs/formsyInput';

// Instruments
import styles from '../styles.css';
import grid from 'theme/grid.css';
import OrderAPI from 'api/orders/';
import PaymentAPI from 'api/payment/';
import 'react-virtualized/styles.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import PaySolidGateRequest from 'api/payment/request';
import {config} from 'config';
import { changeOptionsToReadFormat } from 'instruments';
import { OrderSubmitRequest, UploadFilesRequest } from 'api/orders/request';

@withRouter
@withProfile
export default class Step_3 extends Component {
  state = {
    freeInquiry: false,
    isLoading: false,
    isOpeningPopup: false,
    isOpeningPayCardPopup: false,
    popupText: '',
    payCardPopup: {
      price: '',
      orderId: '',
      redirect: '',
      iframeURL: '',
      errorButton: false,
      approveButton: false,
    },
  };

  _payHandler = (data) => {
    let promise = (new OrderAPI).submit(new OrderSubmitRequest(data));
    let files = this.props.state.order.files;

    this.setState({ isLoading: true });

    let uploadFiles = (data) => {
      let actions = files.map(file => {
        data.order.document = file;
        return (new OrderAPI).uploadFiles(new UploadFilesRequest(data));
      });

      return Promise.all(actions);
    };

    promise.then(data => {
      const { price, id } = data.order;

      this.setState(prevState => ({
        payCardPopup: {
          ...prevState.payCardPopup,
          ...{ price: price },
          ...{ orderId: id },
        },
      }));

      if (this.state.freeInquiry) {
        return uploadFiles(data);
      } else {
        uploadFiles(data);
        return (new PaymentAPI).solidGate(new PaySolidGateRequest(data));
      }
    }).then(data => {
      this.setState(prevState => ({
        isLoading: false,
        isOpeningPayCardPopup: true,
        payCardPopup: {
          ...prevState.payCardPopup,
          ...{ iframeURL: data.paymentResult.pay_form.form_url },
        },
      }));
    }).then(() => {
      this.setState(prevState => ({
        // payCardPopup: {
        //   ...prevState.payCardPopup,
        //   ...{ iframeIsLoading: false },
        // },
      }));
    }).catch(e => {
      this.setState({
        isOpeningPopup: true,
        popupText: e,
      });
    });
  };

  _submit = () => {
    this._payHandler(this.props.state.order);
  };

  _onInvalidSubmit = () => {
    this.refs.form.updateInputsWithError({
      customer_name: (!this.refs.customer_name.getValue() && 'This field is required') || null,
      customer_phone: (!this.refs.customer_phone.getValue() && 'This field is required') || null,
    }, true);
  };

  _closeModal = (popup) => {
    let openedPopup = popup.props.id;

    this.setState({
      [openedPopup]: false,
    });
  };

  _payRedirect = () => {
    this.props.history.push(this.state.payCardPopup.redirect);

    this.setState(prevState => ({
      payCardPopup: {
        ...prevState.payCardPopup,
        ...{ errorButton: false },
        ...{ approveButton: false },
        ...{ redirect: '' },
      },
    }));
  };

  componentDidMount() {
    let redirectPayError = config.redirectPayError;
    let order = this.state.payCardPopup.orderId;

    window.addEventListener('message', (msg) => {
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
                ...{ errorButton: true },
                ...{ redirect: redirectPayError.declined },
              },
            }));
            break;

          case 'approved':
            this.setState(prevState => ({
              payCardPopup: {
                ...prevState.payCardPopup,
                ...{ approveButton: true },
                ...{ redirect: redirectPayError.approved },
              },
            }));

            break;
        }
      }
    });
  }

  render() {
    const {
      payCardPopup,
      isLoading,
      popupText,
      isOpeningPopup,
      isOpeningPayCardPopup,
    } = this.state;
    const { price, orderId, iframeURL, errorButton, approveButton } = payCardPopup;
    const { state, _mergeState } = this.props;
    const { options } = state.pricingValues;
    const { tootTipText } = config;

    return (
      <Formsy
        ref='form'
        onValidSubmit={this._submit}
        onInvalidSubmit={this._onInvalidSubmit}
        noValidate>
        <div className={grid.col}>
          <div className={styles.container}>
            <div className={grid.col50}>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.initial_draft_required}
                  text={`Initial Draft (+${(options) ? changeOptionsToReadFormat(options.initial_draft_price) : ''}%)`}
                  onChange={() => _mergeState('order', { initial_draft_required: !state.order.initial_draft_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.initial_draft_required}
                  </div>
                </Popup>
              </div>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.one_page_summary_required}
                  text={`One-page summary ($${(options) ? options.one_page_summary_price : ''})`}
                  onChange={() => _mergeState('order', { one_page_summary_required: !state.order.one_page_summary_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.one_page_summary_required}
                  </div>
                </Popup>
              </div>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.extended_revision_period_required}
                  text={`Extended revision period (+${(options) ? changeOptionsToReadFormat(options.extended_revision_period_price) : ''}%)`}
                  onChange={() => _mergeState('order', { extended_revision_period_required: !state.order.extended_revision_period_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.extended_revision_period_required}
                  </div>
                </Popup>
              </div>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.vip_support_required}
                  text={`VIP support ($${(options) ? options.vip_support_price : ''})`}
                  onChange={() => _mergeState('order', { vip_support_required: !state.order.vip_support_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.vip_support_required}
                  </div>
                </Popup>
              </div>
              <FormsyInput
                ref='customer_name'
                name='customer_name'
                type='text'
                placeholder='Name Surname'
                validations='minLength:3'
                labeltext='Name'
                validationError='This field is required'
                value={(state.order.customer_name !== '') ? state.order.customer_name : null}
                state={true}
                _mergeState={_mergeState}
                required/>
              <div className={styles.child140}>
                <Counter
                  id='number_of_pages'
                  labeltext='Number of pages'
                  count={state.order.number_of_pages}
                  _mergeState={_mergeState}/>
                <RadioCheckbox
                  name='Spacing'
                  values={{ Double: '275 words', Single: '550 words' }}
                  state={state.order.spacing}
                  _mergeState={(value) => _mergeState('order', { spacing: value })}/>
              </div>
              <div className={styles.child140}>
                <Dropdown
                  options={state.formValues.deadline}
                  value={state.order.deadline}
                  labeltext='Deadline'
                  searchable={false}
                  value={state.order.deadline}
                  onChange={(value) => (value.label === '0 days')
                    ? _mergeState('order', {
                      deadline: {
                        label: '0 days',
                        value: this.refs.DeadlineCount.state.count * 3600,
                      },
                    })
                    : _mergeState('order', { deadline: value })}/>
                <DeadlineCounter
                  ref='DeadlineCount'
                  id='deadline'
                  state={state.order}
                  _mergeState={_mergeState}/>
              </div>
            </div>
            <div className={grid.col50}>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.advanced_writer_required}
                  text={`Advanced Writer (+${(options) ? changeOptionsToReadFormat(options.advanced_writer_price) : ''}%)`}
                  onChange={() => _mergeState('order', { advanced_writer_required: !state.order.advanced_writer_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.advanced_writer_required}
                  </div>
                </Popup>
              </div>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.additional_editing_required}
                  text={`Additional editing (+${(options) ? changeOptionsToReadFormat(options.editing_price) : ''}%)`}
                  onChange={() => _mergeState('order', { additional_editing_required: !state.order.additional_editing_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.additional_editing_required}
                  </div>
                </Popup>
              </div>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.digital_copies_required}
                  text={`Digital copies of sources used ($${(options) ? options.source_copy_price : ''})`}
                  onChange={() => _mergeState('order', { digital_copies_required: !state.order.digital_copies_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.digital_copies_required}
                  </div>
                </Popup>
              </div>
              <div className={`${styles.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={state.order.plagiarism_report_required}
                  text={`Plagiarism report ($${(options) ? options.plagiarism_report_price : ''})`}
                  onChange={() => _mergeState('order', { plagiarism_report_required: !state.order.plagiarism_report_required })}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.plagiarism_report_required}
                  </div>
                </Popup>
              </div>
              <UserPhoneInput
                ref='customer_phone'
                name='customer_phone'
                labeltext='Phone number'
                _mergeState={_mergeState}
                placeholder='Enter phone number'
                validations='minLength:5'
                validationError='This field is required'
                value={(state.order.customer_phone !== '') ? state.order.customer_phone : null}
                required/>
              <div className={styles.child140}>
                <Counter
                  id='number_of_slides'
                  labeltext='Number of slides'
                  count={state.order.number_of_slides}
                  _mergeState={_mergeState}/>
                <Counter
                  id='number_of_charts'
                  labeltext='Number of charts'
                  count={state.order.number_of_charts}
                  _mergeState={_mergeState}/>
              </div>
              <div className={styles.child140}>
                <Input
                  name='preferred_writer'
                  type='text'
                  value={state.order.preferred_writer}
                  placeholder="Writer's ID"
                  onChange={(event) => _mergeState('order', { preferred_writer: event.target.value.replace(/\D/, '') })}
                  labeltext='Preferred writer'/>
                <Input
                  name='discount_code'
                  type='text'
                  placeholder="Discount Code"
                  onChange={(event) => _mergeState('order', { discount_code: event.target.value })}
                  labeltext='Discount Code'/>
              </div>
            </div>
          </div>
          <div className={styles.totalWrapper}>
            <div className={styles.payWrapper}>
              <p className={styles.totalText}>Total: ${state.order.price}</p>
              <p className={styles.greyText}>Please, choose a method of payment</p>
              {(!isLoading) ? (
                <div className={styles.payWrapper}>
                  <button
                    className={styles.payBtn}
                    type='submit'
                    formNoValidate>
                  </button>
                  <div className={grid.justifyContentCenter}>
                    <span className={styles.solidIcon1}></span>
                    <span className={styles.solidIcon2}></span>
                    <span className={styles.solidIcon3}></span>
                    <span className={styles.solidIcon4}></span>
                  </div>
                </div>
              ) : (
                <Preloader/>
              )}
              <p className={styles.greyText}>By placing an order you agree with our&nbsp;
                <a href="#" className={styles.link}>policies</a></p>
              <button
                className={`${styles.link}`}
                type='submit'
                onClick={() => this.setState({ freeInquiry: true })}
                formNoValidate>
                Place your free inquiry
              </button>
            </div>
          </div>
        </div>

        <Popup
          id='isOpeningPayCardPopup'
          ref='payCardPopup'
          className='payCardPopup'
          open={isOpeningPayCardPopup}
          onClose={() => this._closeModal(this.refs.payCardPopup)}
          modal
          closeOnDocumentClick>
          <div className={styles.payCardPopup}>
            <div className={styles.info}>
              <span className={styles.orderText}>Order #{orderId}</span>
              <span className={styles.priceText}>${price}</span>
            </div>
            <iframe
              className={styles.paymentIframe}
              src={iframeURL}>
            </iframe>
            {(errorButton || approveButton) && (
              <button
                type='button'
                onClick={this._payRedirect}
                className={`btn ${errorButton ? `btn--accent` : `btn--primary`} ${styles.iframeButton}`}>
                ok</button>
            )}
          </div>
        </Popup>

        <Popup
          id='isOpeningPopup'
          ref='infoPopup'
          className='infoPopup'
          open={isOpeningPopup}
          onClose={() => this._closeModal(this.refs.infoPopup)}
          modal
          closeOnDocumentClick>
          <p className={styles.popupText}> {popupText} </p>
        </Popup>

      </Formsy>
    );
  }
}
