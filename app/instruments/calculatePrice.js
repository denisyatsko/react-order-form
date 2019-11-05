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
