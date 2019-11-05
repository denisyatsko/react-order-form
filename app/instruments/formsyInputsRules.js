export const formsyInputsRules = {
  email: {
    name: 'email',
    validations: 'isEmail',
    labeltext: 'Your e-mail',
    validationError: 'This is not a valid email',
    required: true,
    input: {
      type: 'email',
      placeholder: 'E-mail',
      autoComplete: 'on',
    },
  },
  password: {
    name: 'password',
    labeltext: 'Password',
    validations: { minLength: 5 },
    validationError: 'This is not a valid password',
    required: true,
    input: {
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'current-password',
    },
  },
  emailForResetPassword: {
    ref: 'emailForResetPassword',
    name: 'emailForResetPassword',
    type: 'email',
    placeholder: 'E-mail',
    validations: 'isEmail',
    validationError: 'This is not a valid email',
    required: true,
  },
  customerName: {
    name: 'customer_name',
    validations: 'minLength:3',
    labeltext: 'Name',
    validationError: 'This is not a valid name',
    required: true,
    input: {
      type: 'text',
      placeholder: 'Name',
    },
  },
  UserPhoneInput: {
    name: 'customer_phone',
    labeltext: 'Phone number',
    validations: 'minLength:5',
    validationError: 'This field is required',
    required: true,
  },
  currentPassword: {
    name: 'currentPassword',
    labeltext: 'Current password',
    validations: { minLength: 5 },
    validationError: 'This is not a valid password',
    input: {
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'current-password',
    },
  },
  newPassword: {
    name: 'newPassword',
    labeltext: 'New password',
    validations: { minLength: 5 },
    validationError: 'This is not a valid password',
    input: {
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'on',
    },
  },
  confirmPassword: {
    name: 'confirmPassword',
    labeltext: 'Confirm new password',
    validations: 'equalsField:newPassword',
    validationError: 'Incorrect password',
    input: {
      type: 'password',
      placeholder: 'Password',
      autoComplete: 'off',
    },
  },
  defaultError: 'This field is required',
};
