const logger = require('../helper/logger');
const response = require('../helper/response');
const {
  ERRORS
} = require('../configs/constants');
const cardModel = require('../models/cards')
module.exports = async (request, referenceId) => {
  try {
    logger.info('[BUSINESS][getCard]', referenceId);
    const getCard = await cardModel.getCard(request.path.card_number)
    if (getCard.EMPTY) {
      throw response.failed({
        errorType: ERRORS.CARD_NOT_FOUND
      });
    }

    const responseBody = {
      cardNumber: getCard.card_number,
      createdAt: getCard.created_at,
    };

    return response.success(responseBody);
  } catch (error) {
    let errMsg = `[ERROR] ${error.message ? error.message : error.name}`;
    logger.error('[CORE][ERROR]', error.stack || error);
    throw response.failed({
      errorType: error.status ? error : ERRORS.GENERIC,
      msg: errMsg
    });
  }
};