'use strict';

const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const config = require(path.resolve('./config/config'));

AWS.config.update({
  accessKeyId: config.uploads.aws.accessKeyId,
  secretAccessKey: config.uploads.aws.secretAccessKey,
  region: 'us-east-2'
});

let s3 = new AWS.S3();

module.exports.upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: {
    fileSize: 52428800
  }
});

module.exports.putObject = function(req, callback) {
  let aws = config.uploads.aws;
  let extname = path.extname(req.file.originalname);
  let fileKey = 'reciepts/' + req.order._id + extname;

  s3.putObject({
    Bucket: aws.bucket,
    Key: fileKey,
    Body: req.file.buffer,
    ACL: 'public-read' // your permisions
  }, (err, data) => {
    console.log(err);
    callback(err, {
      data: data,
      key: `https://s3.${aws.region}.amazonaws.com/${aws.bucket}/${fileKey}`
    });
  });
};

module.exports.imageFileFilter = function (req, file, callback) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    let err = new Error();
    err.code = 'UNSUPPORTED_MEDIA_TYPE';
    return callback(err, false);
  }
  callback(null, true);
};
