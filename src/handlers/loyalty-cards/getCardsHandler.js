const getCards = require('../../business/getCards')
const logger = require('../../helper/logger');
const response = require('../../helper/response');
const { HTTP_STATUS } = require('../../configs/constants');

/* eslint-disable no-use-before-define */
module.exports = async (event, context) => {
  logger.setKey('[/loyalty-cards/{card_number}]');
  logger.info(`Requesting to: ${event.httpMethod} ${event.path}`);
  let responseBody;
  let statusCode = HTTP_STATUS.OK;
  const awsRequestId = context.awsRequestId;
  try {
    const request = {
      body: JSON.parse(event.body) || {},
      query: event?.queryStringParameters || {},
      path: event?.pathParameters || {},
    }
    logger.info('[REQUEST]', request);

    responseBody = await getCards(request, awsRequestId)
    logger.info('[RESPONSE]', responseBody);
  } catch (error) {
    logger.error('[HANDLER][ERROR]', error);

    statusCode = error.status;
    const { status, ...errorInfo } = error;

    responseBody = { error: errorInfo, logId: awsRequestId };
  }

  return response.http({
    statusCode,
    body: responseBody,
  });
};
