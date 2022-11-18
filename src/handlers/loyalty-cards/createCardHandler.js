const createCard = require('../../business/createCard')
const logger = require('../../helper/logger');
const response = require('../../helper/response');
const { validatePresence, validateFormat, verifyToken } = require('../../helper/validator');
const { HTTP_STATUS, HTTP_METHOD, ERRORS } = require('../../configs/constants');

/* eslint-disable no-use-before-define */
module.exports = async (event, context) => {
  logger.setKey('[/loyalty-cards]');
  logger.info(`Requesting to: ${event.httpMethod} ${event.path}`);
  let responseBody;
  let statusCode = HTTP_STATUS.OK;
  const awsRequestId = context.awsRequestId;
  try {
    const data = JSON.parse(event.body) || {};
    const queryParams = event?.queryStringParameters || {};
    const pathParams = event?.pathParameters || {};
    const request = {
      body: data,
      query: queryParams,
      path: pathParams,
    }
    logger.info('[EVENT]', event);
    logger.info('[REQUEST]', data);
    logger.info('[QUERY PARAMS]', queryParams);
    logger.info('[PATH PARAMS]', pathParams);

    validatePresence({
      body: data,
      requirements: ['card_number']
    });
    responseBody = await createCard(request, awsRequestId)
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
