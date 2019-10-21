import Cookies from 'universal-cookie';
import { config } from 'config';

export const calculatePrice = props => {
  // console.log(props)
  const {
    academic_level,
    number_of_pages,
    deadline,
    spacing,
    number_of_slides,
    number_of_charts,
  } = props.order;
  const {
    additional_editing_required,
    advanced_writer_required,
    digital_copies_required,
    plagiarism_report_required,
    initial_draft_required,
    one_page_summary_required,
    extended_revision_period_required,
    vip_support_required,
  } = props.order.options;

  // const optionsArr = props.state.

  const { options, deadline_based_page_prices } = props.pricingValues;
  // console.log(Object.values(options).map(item => item))

  const acLevelVal = academic_level.value;
  const deadlineVal = deadline.value;
  const deadlinePrice = deadlineVal < 86400 ? 86400 : deadlineVal;

  // + 1 necessarily for correct converting percent value
  const addEditing =
    additional_editing_required === true ? options.editing_price + 1 : 1;
  const advancedWriter =
    advanced_writer_required === true ? options.advanced_writer_price + 1 : 1;
  const initialDraft =
    initial_draft_required === true ? options.initial_draft_price + 1 : 1;
  const revision =
    extended_revision_period_required === true
      ? options.extended_revision_period_price + 1
      : 1;

  const sourceCopy =
    digital_copies_required === true ? options.source_copy_price : 0;
  const plagiarismReport =
    plagiarism_report_required === true ? options.plagiarism_report_price : 0;
  const summary =
    one_page_summary_required === true ? options.one_page_summary_price : 0;
  const vipSupport =
    vip_support_required === true ? options.vip_support_price : 0;

  let PagePrice = deadline_based_page_prices[deadlinePrice][acLevelVal];

  PagePrice =
    deadlinePrice === 86400
      ? (((24 - deadlineVal / 3600) / 24) * PagePrice + PagePrice).toFixed(2)
      : PagePrice;

  const priceSlides = PagePrice / 2;

  let optionsArray = Object.values(options).map(option => {
    let arr;
    return option < 1 ? 1 : 0;

  });
  // console.log(props.order.options);
  // console.log(options);
  let r = Object.entries(props.order.options).map(optionVal => {
    if (optionVal[1] === true) {
      let name = optionVal[0];
      // console.log(name);
      // console.log(options);
      // Object.values(options).map(val => {});

    } else {

    }
  });
  // console.log(optionsArray);

  const total =
    (PagePrice * number_of_pages * spacing +
      number_of_slides * priceSlides +
      number_of_charts * priceSlides) *

    addEditing *
    advancedWriter *
    initialDraft *
    revision +
    sourceCopy +
    plagiarismReport +
    summary +
    vipSupport;

  return total.toFixed(2);
};

export const changeOptionsToReadFormat = option => {
  if (option !== undefined) {
    return String(option.toFixed(2)).slice(2);
  }
  return '';
};

export const userTimeView = time_ms => {
  const dtm = new Date(time_ms);
  let mm = `${config.month[dtm.getMonth()]}`;
  let dd = `${dtm.getDate()}`;
  let hh = dtm.getHours();
  let ii = dtm.getMinutes();
  const ampm = hh >= 12 ? 'PM' : 'AM';
  if (parseInt(mm) < 10) mm = `0${mm}`;
  if (parseInt(dd) < 10) dd = `0${dd}`;
  hh %= 12;
  hh = hh || 12;
  ii = ii < 10 ? `0${ii}` : ii;
  hh = hh < 10 ? `0${hh}` : hh;
  const strTime = `${hh}:${ii} ${ampm}`;
  const ddl_user = `${mm} ${dd} ` + ` ${strTime}`;
  return ddl_user;
};

export const delay = (duration = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export class DefaultOrderValues {
  constructor(formValues = null) {
    this.type_of_paper = formValues && formValues.type_of_paper[18] || '';
    this.academic_level = formValues && formValues.academic_level[1] || '';
    this.paper_format = formValues && formValues.paper_format[0] || '';
    this.deadline = formValues && formValues.deadline[0] || '';
    this.subject_or_discipline = formValues && formValues.subject_or_discipline[0] || '';
    this.spacing = 1;
    this.number_of_pages = 1;
    this.number_of_sources = 0;
    this.number_of_slides = 0;
    this.number_of_charts = 0;
    this.paper_details = '';
    this.customer_name = '';
    this.customer_phone = '';
    this.preferred_writer = '';
    this.discount_code = '';
    this.topic = '';
    this.price = '';
    this.files = [];
    this.options = {
      advanced_writer_required: '',
      digital_copies_required: '',
      additional_editing_required: '',
      plagiarism_report_required: '',
      initial_draft_required: '',
      one_page_summary_required: '',
      extended_revision_period_required: '',
      vip_support_required: '',
    }
  }
}

export class AuthType {
  constructor(type) {
    this.title = type.title;
    this.btnText = type.btnText;
  }
}

export const AuthState = new AuthType({ title: 'Registration', btnText: 'Sign up' });
export const LoginState = new AuthType({ title: 'Log in', btnText: 'Log in' });

export const cookies = new Cookies();

export const routes = {
  ORDER_FORM: '/order-form',
  CABINET: '/cabinet',
  LOGIN: '/login',
};

export const orderFormRoutes = {
  STEP_1: `${routes.ORDER_FORM}/step-1`,
  STEP_2: `${routes.ORDER_FORM}/step-2`,
  STEP_3: `${routes.ORDER_FORM}/step-3`,
  LOGGED_USER: `${routes.ORDER_FORM}/loggedUser`,
};

export const cabinetRoutes = {
  ORDERS: `${routes.CABINET}/orders`,
  ORDER: `${routes.CABINET}/order`,
  DISCOUNTS: `${routes.CABINET}/discounts`,
  PROFILE: `${routes.CABINET}/profile`,
  EARN_CASH: `${routes.CABINET}/earn-cash`,
};

export const redirectPayError = {
  declined: orderFormRoutes.STEP_2,
  approved: cabinetRoutes.ORDERS,
};
