const aws = require('aws-sdk');
const { aws: s3Config } = require('./vars');

const {
    region,
    apiVersion,
    credentials,
} = s3Config;

const getStorage = () => {
    if (!region || !apiVersion || !credentials
        || !credentials.accessKeyId || !credentials.secretAccessKey) {
        return null;
    }

    const bucketCredentials = new aws.Credentials(credentials);

    return new aws.S3({
        region,
        apiVersion,
        credentials: bucketCredentials,
    });
};

exports.s3 = getStorage();
