const core = require('@actions/core');
const aws = require('aws-sdk');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION;

const path = core.getInput('PATH');
const exportPrefix = core.getInput('EXPORT_PREFIX');

if (!AWS_ACCESS_KEY_ID) {
  core.setFailed('The env AWS_ACCESS_KEY_ID was not set.');
}
if (!AWS_SECRET_ACCESS_KEY) {
  core.setFailed('The env AWS_SECRET_ACCESS_KEY was not set.');
}
if (!AWS_DEFAULT_REGION) {
  core.setFailed('The env AWS_DEFAULT_REGION was not set.');
}

const ssm = new aws.SSM({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_DEFAULT_REGION,
});

const getParametersByPath = (ssm, path, nextToken = undefined) => ssm.getParametersByPath({
  Path: path,
  WithDecryption: true,
  NextToken: nextToken,
});

const exportVariables = (nextToken) => getParametersByPath(ssm, path, nextToken).promise().then(response => {
  core.startGroup('Exports');

  response.Parameters.forEach((parameter) => {
    const sanitizedName = parameter.Name.replace(path, '').replace('/', '');

    core.info(`${exportPrefix}${sanitizedName}=${parameter.Value.slice(0, 3)}`);
    core.exportVariable(`${exportPrefix}${sanitizedName}`, parameter.Value);
  });

  if(!!response.NextToken) {
    exportVariables(response.NextToken);
  } else {
    core.endGroup();
  }
}).catch(err => {
  core.setFailed(err);
});

exportVariables();

exports.exportVariables = exportVariables;
