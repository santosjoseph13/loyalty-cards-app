module.exports = {
  HTTP_STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    REDIRECT: 301,
    CREATED: 201,
  },
  HTTP_METHOD: {
    GET: 'GET',
    POST: 'POST',
  },

  ERRORS: {
    INCOMPLETE_PARAMETERS: {
      status: 400,
      code: 10000,
      name: 'Incomplete Parameters',
    },
    INVALID_ITEM: {
      status: 400,
      code: 10001,
      name: 'Invalid item',
    },
    DATABASE: {
      status: 500,
      code: 10002,
      name: 'Database Error',
    },
    GENERIC: {
      status: 500,
      code: 10003,
      name: 'Generic Error',
    },
    INVALID_FORMAT: {
      status: 400,
      code: 10004,
      name: 'Invalid format',
    },
    AUTH_FAILED: {
      status: 401,
      code: 10005,
      name: 'Authentication Failed',
    },
    USERNAME_EXISTS: {
      status: 400,
      code: 30000,
      name: 'Username already exists',
    },
    CARD_NOT_FOUND: {
      status: 404,
      code: 40000,
      name: 'Card not found',
    },
    INVALID_STATUS: {
      status: 400,
      code: 40001,
      name: 'Invalid status',
    },
    INVALID_SUBCATEGORY: {
      status: 400,
      code: 40002,
      name: 'Invalid subcategory',
    },
    INVALID_ATTEMPT: {
      status: 400,
      code: 40003,
      name: 'Invalid attempt',
    },
    PHOENIX: {
      status: 400,
      code: 40004,
      name: 'Phoenix API Error',
    },
    SALES_ACCOUNT_NOT_FOUND: {
      status: 400,
      code: 40005,
      name: 'Sales Account not found',
    },
    NOT_FOUND: {
      status: 404,
      code: 40006,
      name: 'Route not found',
    },
    UPDATE_NOT_FOUND: {
      status: 404,
      code: 40007,
      name: 'Updates not found',
    },
    SESSION_USED: {
      status: 400,
      code: 40008,
      name: 'Session is already used/pending',
    },
    TRANSACTION_NOT_FOUND: {
      status: 404,
      code: 40009,
      name: 'Transaction not found',
    },
    POSTPAID_APPLIED: {
      status: 400,
      code: 40010,
      name: 'Postpaid application already filed',
    },
    SIGNUP_APPLIED: {
      status: 400,
      code: 40011,
      name: 'Signup application already filed',
    },
    UPLOAD_FAIL: {
      status: 400,
      code: 40012,
      name: 'Error in file uploads',
    },
    OTP_PENDING: {
      status: 400,
      code: 40013,
      name: 'OTP Pending',
    },
    ACCOUNT_ERROR: {
      status: 400,
      code: 40014,
      name: 'Account verification error',
    },
    CASHOUT_ERROR: {
      status: 400,
      code: 40015,
      name: 'Cashout Transaction Error'
    },
    CARD_EXISTS: {
      status: 400,
      code: 40016,
      name: 'Card already exists',
    },
  },

  STATUS: {
    INITIAL: 'INITIAL',
    SUBMITTED: 'SUBMITTED',
    COMPLETED: 'COMPLETED',
    PENDING: 'PENDING',
    FAILED: 'FAILED',
    DEBITED: 'DEBITED',
    FOR_CONFIRMATION: 'FOR_CONFIRMATION',
    CANCELLED: 'CANCELLED',
    ENQUEUED: 'ENQUEUED',
    PAID: 'PAID',
    SUCCESS: 'SUCCESS',
    FOR_PROCESSING: 'FOR_PROCESSING',
  },
  OTP_STATUS: {
    EXPIRED: 'EXPIRED',
    ACTIVE: 'ACTIVE',
    LOGOUT: 'LOGOUT',
    PENDING: 'PENDING',
    RESEND: 'RESEND'
  }

};
