const logger = require('../../build/helper/logger');
const response = require('../../build/helper/response');
const {
  ERRORS
} = require('../../build/configs/constants');
const cardModel = require('../models/cards')
module.exports = async (request, referenceId) => {
  try {
    logger.info('[BUSINESS][getCards]', referenceId);
    const getCards = await cardModel.getCards(request.path.card_number)
    if (getCards.EMPTY) {
      throw response.failed({
        errorType: ERRORS.CARD_NOT_FOUND
      });
    }
    console.log(getCards)
    const responseBody = {
      cards: getCards.items,
      count: getCards.count
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