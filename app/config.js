const END_POINT = process.env.NODE_ENV === 'development'
  ? 'https://api-v2.dexfront.site/api/customer'
  : 'https://client-space.dexfront.site/api/customer';

export const config = {
  apiURL: {
    login: `${END_POINT}/auth/login/`,
    update: `${END_POINT}/user/update/`,
    forgot: `${END_POINT}/auth/forgot/`,
    submit: `${END_POINT}/orders/submit/`,
    refund: `${END_POINT}/orders/refund/`,
    order: `${END_POINT}/orders/getOrder/`,
    retrieve: `${END_POINT}/auth/retrieve/`,
    register: `${END_POINT}/auth/register/`,
    orders: `${END_POINT}/orders/getOrders/`,
    revision: `${END_POINT}/orders/revision/`,
    feedback: `${END_POINT}/orders/feedback/`,
    checkWriter: `${END_POINT}/orders/checkWriter/`,
    getMessages: `${END_POINT}/orders/getMessages/`,
    uploadFiles: `${END_POINT}/orders/uploadFiles/`,
    solidgate: `${END_POINT}/payment/solidgate/pay/`,
    downloadFile: `${END_POINT}/orders/downloadFile`,
    formValues: `${END_POINT}/main/getOrderFormSetup/`,
    getOrderFiles: `${END_POINT}/orders/getOrderFiles/`,
    changePassword: `${END_POINT}/user/changePassword/`,
    markMessagesAsRead: `${END_POINT}/orders/markMessagesAsRead/`,
    sendMessageToWriter: `${END_POINT}/orders/sendMessageToWriter/`,
    getFileDownloadToken: `${END_POINT}/orders/getFileDownloadToken/`,
    sendMessageToSupport: `${END_POINT}/orders/sendMessageToSupport/`,
  },
  month: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  tootTipText: {
    advanced_writer_required: 'By enabling this feature your order will be completed by an Advanced and/or Native English writer.',
    additional_editing_required: 'By enabling this option your text will receive a professional proofreading and be edited by our U.S. editorial staff. This feature signifies your desire to receive a flawless paper, eliminating the slightest chance of mistakes.',
    digital_copies_required: 'You will receive articles in PDF, or access to the sources used online. Mind that in cases where books are used for orders you will not be provided with them in their entirety. However, you will receive the locations where the books are stored, either for viewing or purchasing.',
    plagiarism_report_required: 'Get a plagiarism report to prove originality of your paper.',
    initial_draft_required: 'Get a 30-50% draft of your paper to make sure you and the writer are on the same page.',
    one_page_summary_required: 'Bullet-points of your paper in one double-spaced page.',
    extended_revision_period_required: 'Extra 20 days of free alterations period.',
    vip_support_required: 'Get calls and follow-ups from our support regarding the status of your order.',
  },
  complicatedDisciplines: [
    2, 5, 7, 8, 10, 14, 15, 16, 29, 32, 35, 42, 43, 44, 46, 50, 61, 62, 65,
  ],
  maxTextareaContentLength: 500,
  maxCountValue: 100,
  defaultDeadline: 5, // in hours
  resetPasswordText: {
    success: 'We send you notification, please check your email.',
    error: 'Sorry, but email not found.',
  },
  updateInfoText: {
    user: 'User information has been changed',
    password: 'Password has been changed',
  },
  orderStatus: {
    unpaid: 'unpaid',
    in_progress: 'in_progress',
    revision: 'revision',
    finished: 'finished',
  },
  orderActionText: {
    accept: 'done!',
    revision: 'done!',
    refund: 'done!',
  },
  revisionDeadline: [
    {
      label: '12 hours',
      value: '43200'
    },
    {
      label: '24 hours',
      value: '86400'
    },
    {
      label: '48 hours',
      value: '172800'
    },
    {
      label: '3 days',
      value: '259200'
    },
    {
      label: '7 days',
      value: '604800'
    }
  ],
  sortOrdersValues: [
    {
      label: 'Active',
      value: 1,
    },
    {
      label: 'Finished',
      value: 2,
    },
    {
      label: 'Require your action',
      value: 3,
    }
  ],
  orderTabs: {
    tab1: 'Complete order information',
    tab2: 'Messages',
    tab3: 'Files',
    tab4: 'Accept Order',
    tab5: 'Revision Order',
    tab6: 'Refund Order',
  },
};

