const logger = require('../helper/logger');
const response = require('../helper/response');
const { ERRORS, STATUS, SESSION_TYPE, OTP_STATUS } = require('../configs/constants');
const cardModel = require('../models/cards')

module.exports = async (request, referenceId) => {

  try {
    logger.info('[BUSINESS][createCard]', referenceId);
    const datetime = new Date()
    const timestamp = datetime.toISOString()
    const getCard = await cardModel.getCard(request.body.card_number)
    if (!getCard.EMPTY) {
      throw response.failed({
        errorType: ERRORS.CARD_EXISTS
      });
    }

    const params = {
      cardNumber: request.body.card_number,
      createdAt: timestamp,
    }
    await cardModel.save(params, referenceId)

    const responseBody = {
      cardNumber: request.body.card_number,
      createdAt: timestamp
    };

    return response.success(responseBody);
  }
  catch (error) {
    let errMsg = `[ERROR] ${error.message ? error.message : error.name}`;

    logger.error('[CORE][ERROR]', error.stack || error);

    throw response.failed({
      errorType: error.status ? error : ERRORS.GENERIC,
      msg: errMsg,
    });
  }
};