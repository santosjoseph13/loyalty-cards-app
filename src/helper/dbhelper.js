const AWS = require('aws-sdk');
// const { awsCognitoCredentials } = require('../../utils/awsCredentialsHelper');

const DB = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
  // credentials: config.DB.IDENTITY_POOL_ID !== '?' ? awsCognitoCredentials : undefined,
});

module.exports.add = (table, key, value, item, options = {}) => { // eslint-disable-line no-unused-vars
  const keys = Object.keys(item);
  const updateStatement = [];
  const attributes = {};

  keys.forEach((k) => {
    if (k !== key && item[k] !== undefined) {
      updateStatement.push(`${k} = :${k}`);
      attributes[`:${k}`] = item[k];
    }
  });

  return DB.update({
    TableName: table,
    Key: { [key]: value },
    UpdateExpression: `SET ${updateStatement.join(', ')}`,
    ExpressionAttributeValues: attributes,
    ReturnValues: 'ALL_NEW',
    // ...options
  })
    .promise()
    .then((result) => result.Attributes);
};

module.exports.get = (table, property, value) => {
  console.log(table, property, value)
  return DB.get({
    TableName: table,
    Key: {
      [property]: value,
    },
  })
    .promise()
    .then((result) => result.Item);
}


module.exports.update = (table, key, value, updateStatement, names, values) => DB.update({
  TableName: table,
  Key: {
    [key]: value,
  },
  UpdateExpression: updateStatement,
  ExpressionAttributeNames: names,
  ExpressionAttributeValues: values,
  ReturnValues: 'UPDATED_NEW'
})
  .promise()
  .then((result) => result.Item);

module.exports.scan = (table, index = undefined, filters = {}) => DB.scan({
  TableName: table,
  IndexName: index,
  ScanFilter: filters,
})
  .promise()
  .then((result) => ({
    items: result.Items,
    count: result.Count,
  })).catch((error) => {
    throw error;
  });

module.exports.scanFilter = (table, params = {}) => DB.scan({
  TableName: table,
  ...params,
})
  .promise()
  .then((result) => ({
    items: result.Items,
    count: result.Count,
  }));

module.exports.delete = (table, property, value) => DB.delete({
  TableName: table,
  Key: {
    [property]: value,
  },
  ReturnValues: 'ALL_OLD',
})
  .promise()
  .then((result) => result);