# AWS SSM actions

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/say8425/aws-secrets-manager-actions/blob/master/LICENSE)

This GitHub Action helps you fetch your parameters that stored in [AWS SSM](https://aws.amazon.com/systems-manager) to environment values.

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
     SECRET_NAME: ${{ secrets.SECRET_NAME }}
     OUTPUT_PATH: '.env' # optional
```

### Environment Values

Your parameters will be exported as environment values.

## License

This project is [MIT](https://github.com/expororpranjic/aws-secrets-manager-action/blob/master/LICENSE) licensed.
