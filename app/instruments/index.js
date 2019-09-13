import Cookies from 'universal-cookie';
import { config } from 'config';

export const calculatePrice = props => {
  const {
    academic_level,
    number_of_pages,
    deadline,
    spacing,
    number_of_slides,
    number_of_charts,
    additional_editing_required,
    advanced_writer_required,
    digital_copies_required,
    plagiarism_report_required,
    initial_draft_required,
    one_page_summary_required,
    extended_revision_period_required,
    vip_support_required,
  } = props.order;

  const { options, deadline_based_page_prices } = props.pricingValues;

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

export class AuthType {
  constructor(text) {
    this.text = text;
  }
}

export const AuthState = new AuthType('sign up');
export const LoginState = new AuthType('log in');

export const cookies = new Cookies();
