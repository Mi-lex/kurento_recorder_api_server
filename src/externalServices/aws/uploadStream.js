const { s3 } = require('../../config/aws');

async function uploadStream({
    bucketName, stream, key, contentType,
}) {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: stream,
        ContentType: contentType,
    };

    const res = await s3.upload(params).promise();

    return {
        location: res.Location,
    };
}

exports.uploadStream = uploadStream;
