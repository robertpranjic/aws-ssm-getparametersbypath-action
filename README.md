# AWS SSM actions

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/say8425/aws-secrets-manager-actions/blob/master/LICENSE)

This GitHub Action helps you fetch your parameters that are stored in [AWS SSM](https://aws.amazon.com/systems-manager) and export them to environment values.

## Usage

```yaml
steps:
 - name: Store ENV from AWS SecretManager
   uses: expororpranjic/aws-secrets-manager-actions@master
   env:
     AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
     AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
     AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
   with:
     PATH: '/myApp/myEnv/'
     EXPORT_PREFIX: 'SSM_PARAM_' # optional
```

### Environment Values

Your parameters will be exported as environment values.
Let's assume you have 2 params in the given path:

```bash
/myApp/myEnv/PARAM_1
/myApp/myEnv/PARAM_2
```

These will be converted to the following env vars:
```bash
PARAM_1=param1value
PARAM_2=param2value
```

You can use them in further actions like this:
```yaml
 - name: My action
   env:
     ENV_NAME_1: $SSM_PARAM_PARAM_1
     ENV_NAME_2: $SSM_PARAM_PARAM_2
   run: # any command that uses these env vars#
```

# Important note
Secure strings are not supported yet!
This is a feature that will be implemented in the future.

## License

This project is [MIT](https://github.com/expororpranjic/aws-secrets-manager-action/blob/master/LICENSE) licensed.
