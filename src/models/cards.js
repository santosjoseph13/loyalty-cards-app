const dbhelper = require('../helper/dbhelper');
const logger = require('../helper/logger');
const DB = {
  LOYALTY_TABLE: process.env.LOYALTY_TABLE,
  LOYALTY_TABLE_PK: process.env.LOYALTY_TABLE_PK
}
const modelName = '[CARD]'
const save = async (data, referenceId) => {
  try {
    // mapping for security
    const params = {
      card_number: data.cardNumber,
      created_at: data.createdAt
    };

    logger.info(params, `[MODEL]${modelName} Saving info to DB... [${referenceId}]`);

    const result = await dbhelper.add(DB.LOYALTY_TABLE, DB.LOYALTY_TABLE_PK, params.card_number, params);

    return result;
  } catch (error) {
    logger.error(error, `[MODEL][DB ERROR] [${referenceId}]`);
    throw error;
  }
};

const getCard = async (cardNumber) => {
  logger.info(`[MODEL]${modelName}[GET CARD]`);
  try {
    let result = await dbhelper.get(DB.LOYALTY_TABLE, DB.LOYALTY_TABLE_PK, cardNumber);
    logger.info(`[MODEL]${modelName} Get info to DB... [${JSON.stringify(result)}]`);
    result = result || { EMPTY: true }; // sometimes result is undefined
    return result;
  } catch (error) {
    if (logger) {
      logger.error(error, `[data/retrieve][DB ERROR] [${cardNumber}]`);
    }

    throw error;
  }
};

const getCards = async () => {
  logger.info(`[MODEL]${modelName}[GET CARDS]`);
  try {
    let result = await dbhelper.scan(DB.LOYALTY_TABLE);
    logger.info(`[MODEL]${modelName} Get info to DB... [${JSON.stringify(result)}]`);
    result = result || { EMPTY: true }; // sometimes result is undefined
    return result;
  } catch (error) {
    if (logger) {
      logger.error(error, `[data/retrieve][DB ERROR]`);
    }

    throw error;
  }
};


module.exports = {
  save,
  getCards,
  getCard,
};