const createCard = require('../business/createCard')
const getCard = require('../business/getCard')
const getCards = require('../business/getCards')
const logger = require('../helper/logger');
const response = require('../helper/response');
const { validatePresence, validateFormat, verifyToken } = require('../helper/validator');
const { HTTP_STATUS, HTTP_METHOD, ERRORS } = require('../configs/constants');
const { create } = require('domain');

/* eslint-disable no-use-before-define */
module.exports = async (event, context) => {
  logger.setKey('[/cards]');
  logger.info(`Requesting to: ${event.httpMethod} ${event.path}`);
  let responseBody;
  let statusCode = HTTP_STATUS.OK;
  const awsRequestId = context.awsRequestId;
  try {
    const data = JSON.parse(event.body) || {};
    const queryParams = event?.queryStringParameters || {};
    const pathParams = event?.pathParameters || {};
    const path = event.resource || {};
    const method = event.httpMethod || {};
    const request = {
      body: data,
      query: queryParams,
      path: pathParams,
    }
    logger.info('[EVENT]', event);
    logger.info('[REQUEST]', data);
    logger.info('[PATH]', path);
    logger.info('[QUERY PARAMS]', queryParams);
    logger.info('[PATH PARAMS]', pathParams);
    logger.info('[ENV]', process.env)
    responseBody = process.env

    const routes = {
      'GET': {
        '/cards': {
          execute: getCards,
        },
        '/cards/{card_number}': {
          execute: getCard,
          validate: validatePresence,
          validateParams: ['card_number'],
          validateWhere: 'path'
        }
      },
      'POST': {
        '/cards': {
          execute: createCard,
          validate: validatePresence,
          validateParams: ['card_number'],
          validateWhere: 'body'
        },
      }
    }
    if (routes[method] && routes[method][path]) {
      if (routes[method][path].hasOwnProperty('validate')) {
        validatePresence({
          body: request[routes[method][path].validateWhere],
          requirements: routes[method][path].validateParams
        });
      }
      responseBody = await routes[method][path].execute(request, awsRequestId)
    } else {
      throw response.failed({
        errorType: ERRORS.NOT_FOUND
      });
    }


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
