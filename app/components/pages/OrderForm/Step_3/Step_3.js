// Core
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import Popup from 'reactjs-popup';

// Components
import { withProfile } from 'components/HOC/withProfile';
import {
  SolidGate,
  DeadlineCounter,
  OrderFormPayButtonStub,
} from 'components/ui/export';
import {
  Input,
  Counter,
  Preloader,
  Checkbox,
  Dropdown,
  FormsyInput,
  RadioCheckbox,
  UserPhoneInput,
} from 'components/common/export';

// Instruments
import { config } from 'config';
import {
  changeOptionsToReadFormat,
  formsyInputsRules,
  submitOrder,
  uploadFiles,
} from 'instruments/export';

// Styles
import styles from '../styles.css';
import grid from 'theme/grid.css';
import 'react-virtualized/styles.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

@withProfile
export class Step_3 extends Component {
  constructor(props) {
    super(props);
    this.messageListener = this.props._message;
  }

  state = {
    isLoading: false,
  };

  _onInvalidSubmit = (...args) => {
    const { form } = this.refs;

    let model = args.length > 0 ? args[0] : form.getModel();

    form.updateInputsWithError({
      customer_name: (!model.customer_name && formsyInputsRules.defaultError) || null,
      customer_phone: (!model.customer_phone && formsyInputsRules.defaultError) || null,
    }, true);
  };

  _submit = () => {
    const { _payHandler, state } = this.props;

    const files = state.order.files;

    this.setState({ isLoading: true });

    submitOrder(state.order).then(data => {
      if (files.length > 0) uploadFiles(files, data.order);

      _payHandler(data.order, false).then(() => this.setState({ isLoading: false }));
    });
  };

  _freeInquiryHandler = () => {
    const { _payHandler } = this.props;
    const { isValid } = this.refs.form.state;

    if (isValid) {
      this.setState({ isLoading: true });

      _payHandler(null, true).then(() => this.setState({ isLoading: false }));
    } else {
      this._onInvalidSubmit();
    }
  };

  componentDidMount() {
    window.addEventListener('message', this.messageListener, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.messageListener, false);
  }

  render() {
    const { isLoading } = this.state;
    const { tootTipText } = config;
    const { state, _mergeState, _mergeOrderOptions } = this.props;
    const { options } = state.pricingValues;
    const { options: stateOptions } = state.order;

    const handler_initial_draft = () => _mergeOrderOptions('initial_draft_required', !stateOptions.initial_draft_required);
    const handler_one_page_summary = () => _mergeOrderOptions('one_page_summary_required', !stateOptions.one_page_summary_required);
    const handler_extended_revision_period = () => _mergeOrderOptions('extended_revision_period_required', !stateOptions.extended_revision_period_required);
    const handler_vip_support = () => _mergeOrderOptions('vip_support_required', !stateOptions.vip_support_required);
    const handler_advanced_writer = () => _mergeOrderOptions('advanced_writer_required', !stateOptions.advanced_writer_required);
    const handler_additional_editing = () => _mergeOrderOptions('additional_editing_required', !stateOptions.additional_editing_required);
    const handler_digital_copies = () => _mergeOrderOptions('digital_copies_required', !stateOptions.digital_copies_required);
    const handler_plagiarism_report = () => _mergeOrderOptions('plagiarism_report_required', !stateOptions.plagiarism_report_required);

    return (
      <Formsy
        ref='form'
        onValidSubmit={this._submit}
        onInvalidSubmit={this._onInvalidSubmit}
        noValidate>
        <div className={grid.col}>
          <div className={styles.container}>
            <div className={grid.col50}>
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.initial_draft_required}
                  text={`Initial Draft (+${(options) && changeOptionsToReadFormat(options.initial_draft_price)}%)`}
                  onChange={handler_initial_draft}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.initial_draft_required}
                  </div>
                </Popup>
              </div>
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.one_page_summary_required}
                  text={`One-page summary ($${(options) && options.one_page_summary_price})`}
                  onChange={handler_one_page_summary}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.one_page_summary_required}
                  </div>
                </Popup>
              </div>
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.extended_revision_period_required}
                  text={`Extended revision period (+${(options) && changeOptionsToReadFormat(options.extended_revision_period_price)}%)`}
                  onChange={handler_extended_revision_period}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.extended_revision_period_required}
                  </div>
                </Popup>
              </div>
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.vip_support_required}
                  text={`VIP support ($${(options) && options.vip_support_price})`}
                  onChange={handler_vip_support}/>
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
                {...formsyInputsRules.customerName}
                _mergeState={_mergeState}
                value={(state.order.customer_name !== '') ? state.order.customer_name : null}
              />
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
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.advanced_writer_required}
                  text={`Advanced Writer (+${(options) && changeOptionsToReadFormat(options.advanced_writer_price)}%)`}
                  onChange={handler_advanced_writer}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.advanced_writer_required}
                  </div>
                </Popup>
              </div>
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.additional_editing_required}
                  text={`Additional editing (+${(options) && changeOptionsToReadFormat(options.editing_price)}%)`}
                  onChange={handler_additional_editing}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.additional_editing_required}
                  </div>
                </Popup>
              </div>
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.digital_copies_required}
                  text={`Digital copies of sources used ($${(options) && options.source_copy_price})`}
                  onChange={handler_digital_copies}/>
                <Popup
                  trigger={<button className={styles.toolTip}>?</button>}
                  position='right center'
                  on='hover'>
                  <div className={styles.toolTipContent}>
                    {tootTipText.digital_copies_required}
                  </div>
                </Popup>
              </div>
              <div className={`${grid.flexBetween} ${styles.mb}`}>
                <Checkbox
                  state={stateOptions.plagiarism_report_required}
                  text={`Plagiarism report ($${(options) && options.plagiarism_report_price})`}
                  onChange={handler_plagiarism_report}/>
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
                {...formsyInputsRules.UserPhoneInput}
                _mergeState={_mergeState}
                value={(state.order.customer_phone !== '') ? state.order.customer_phone : null}
              />
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
            <div className={`${!state.isVisiblePayButton ? styles.complicatedDisciplines : ''} ${styles.payWrapper}`}>
              <p className={styles.totalText}>Total: ${state.order.price}</p>
              <div className={styles.boxShadow}>
                {state.isVisiblePayButton ? (
                  <>
                    <p className={styles.greyText}>Please, choose a method of payment</p>
                    {isLoading ? <Preloader/> : <SolidGate/>}
                    <p className={styles.greyText}>By placing an order you agree with our&nbsp;
                      <a href="#" className={styles.link}>policies</a>
                    </p>
                  </>
                ) : (
                  <OrderFormPayButtonStub/>
                )}
                <button
                  className={`${styles.link}`}
                  type='button'
                  onClick={() => this._freeInquiryHandler()}
                >
                  Place free inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </Formsy>
    );
  }
}
