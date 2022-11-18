module.exports = {
  http: ({ statusCode, headers, body }) => {
    const defaultHeaders = {
      'Access-Control-Allow-Origin': '*',
    };
    return {
      statusCode,
      headers: headers || defaultHeaders,
      body: JSON.stringify(body),
    };
  },
  success: (data, msg) => ({
    data,
    message: msg || 'SUCCESS',
  }),
  failed: ({ errorType, msg, details }) => ({
    status: errorType.status,
    name: errorType.name,
    code: errorType.code,
    message: msg || undefined,
    details: details || undefined,
  }),
};
