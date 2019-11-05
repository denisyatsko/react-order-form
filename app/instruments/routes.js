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
