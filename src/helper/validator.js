const { ERRORS } = require('../configs/constants');
const response = require('./response');
/**
 * @param body - object
 * @param requirements - array
 */
module.exports.validatePresence = ({ body, requirements, keyname }) => {
  console.log(body, requirements)
  for (let i = 0; i < requirements.length; i++) {
    if (!body[requirements[i]]) {
      throw response.failed({
        errorType: ERRORS.INCOMPLETE_PARAMETERS,
        msg: keyname ? `'${keyname}.${requirements[i]}' is required.` : `'${requirements[i]}' is required.`,
      });
    }
  }
};

/**
 * @param attributeValue - string
 * @param range - array
 */
module.exports.validateInRange = ({ attributeValue, range }) => {
  if (!range.includes(attributeValue)) {
    throw response.failed({
      errorType: ERRORS.INVALID_ITEM,
      msg: `'${attributeValue}' is invalid.`,
    });
  }
};

const PATTERNS = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line no-useless-escape
  MOBILE: /^(09\d{9})$/,
  NAME: /^[A-Za-z ,.'-ñÑ]+$/,
  URL: /^[A-Za-z0-9-]{1,20}$/,
  USERNAME: /^[A-Za-z0-9-@!?]{8,20}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/
};

/**
 * @param input
 * @param format - object. formats: username, email, mobile, numeric, min, max, minlength, maxlength, url, regex
 * @param keyname - string
 */
module.exports.validateFormat = ({ input, format, keyname }) => {
  if (format.email) {
    if (!PATTERNS.EMAIL.test(input)) {
      throw response.failed({
        errorType: ERRORS.INVALID_FORMAT,
        msg: `'${keyname || input}' invalid email format.`,
      });
    }
  }

  if (format.mobile) {
    if (!PATTERNS.MOBILE.test(input)) {
      throw response.failed({
        errorType: ERRORS.INVALID_FORMAT,
        msg: `'${keyname || input}' must be formatted 09XXXXXXXXX.`,
      });
    }
  }

  if (format.name) {
    if (!PATTERNS.NAME.test(input)) {
      throw response.failed({
        errorType: ERRORS.INVALID_FORMAT,
        msg: `'${keyname || input}' invalid name format.`,
      });
    }
  }

  if (format.url) {
    if (!PATTERNS.URL.test(input)) {
      throw response.failed({
        errorType: ERRORS.INVALID_FORMAT,
        msg: `Invalid Short URL format.`,
      });
    }
  }

  if (format.username) {
    if (!PATTERNS.USERNAME.test(input)) {
      throw response.failed({
        errorType: ERRORS.INVALID_FORMAT,
        msg: `Invalid username format/length.`,
      });
    }
  }

  if (format.password) {
    if (!PATTERNS.PASSWORD.test(input)) {
      throw response.failed({
        errorType: ERRORS.INVALID_FORMAT,
        msg: `Invalid password format/length.`,
      });
    }
  }

  if (format.file) {
    if (input?.type != 'file') {
      throw response.failed({
        errorType: ERRORS.INVALID_FORMAT,
        msg: 'Invalid file upload format'
      });
    }
  }
};
