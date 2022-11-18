const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
// const dev = require('../configs/dev')

module.exports = async ({ options, resolveVariable }) => {
  const stage = await resolveVariable('self:provider.stage');
  const region = await resolveVariable('self:provider.region');

  const parameter = `/loyalty-cards/${stage}`;
  const client = new SSMClient({ region });

  const command = new GetParameterCommand({
    Name: parameter,
  });

  const res = await client.send(command);
  const params = JSON.parse(res.Parameter.Value);
  const keys = Object.keys(params);
  // const missingParams = Object.keys(dev).filter((name) => !keys.includes(name));
  // if (missingParams.length) {
  //   throw new Error(`Missing params in '${parameter}': ${missingParams.join(' ')}`);
  // }

  return params;
}