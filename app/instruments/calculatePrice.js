export const calculatePrice = props => {
  const {
    spacing,
    number_of_pages,
    number_of_slides,
    number_of_charts,
    deadline: { value: deadlineVal},
    academic_level: { value: acLevelVal },
  } = props.order;
  const { options, deadline_based_page_prices } = props.pricingValues;

  let optionsObj = { ...props.order.options };

  Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate));

  let percentOptionsObj = Object.filter(optionsObj, ([key]) => options[key] < 1);
  let plusOptionsObj = Object.filter(optionsObj, ([key]) => options[key] > 1);

  let percentOptions = Object.entries(percentOptionsObj)
    .map(([key, value]) => value === true ? options[key] + 1 : 1)
    .reduce((p, c) => p * c, 1);

  let plusOptions = Object.entries(plusOptionsObj)
    .map(([key, value]) => value === true ? options[key] : 0)
    .reduce((p, c) => p + c, 0);

  let deadlinePrice = deadlineVal < 86400 ? 86400 : deadlineVal;
  let PagePrice = deadline_based_page_prices[deadlinePrice][acLevelVal];

  PagePrice = deadlinePrice === 86400
    ? (((24 - deadlineVal / 3600) / 24) * PagePrice + PagePrice).toFixed(2)
    : PagePrice;

  let priceSlides = PagePrice / 2;

  let total = (PagePrice * number_of_pages * spacing + number_of_slides * priceSlides +
    number_of_charts * priceSlides) * percentOptions + plusOptions;

  return total.toFixed(2);
};
