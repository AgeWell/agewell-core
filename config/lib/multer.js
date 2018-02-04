'use strict';

const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const config = require(path.resolve('./config/config'));

AWS.config.update({
  accessKeyId: config.uploads.aws.accessKeyId,
  secretAccessKey: config.uploads.aws.secretAccessKey,
  region: 'us-east-2'
});

cloudinary.config({
  cloud_name: config.uploads.cloudinary.cloud_name,
  api_key: config.uploads.cloudinary.api_key,
  api_secret: config.uploads.cloudinary.api_secret
});

let s3 = new AWS.S3();


const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'images',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  filename: function (req, file, cb) {
    // console.log(req, file);
    cb(undefined, file.originalname);
  }
});

module.exports.upload = multer({
  storage: storage,
  // file size limitation in bytes
  limits: {
    fileSize: 52428800
  }
});

module.exports.putObject = function(req, callback) {
  let url = 'http://res.cloudinary.com/hkwttvjpo/image/upload/v1517719376';
  let extname = path.extname(req.file.originalname);
  let fileKey = 'reciepts/' + req.order._id + extname;
  
  callback(null, {
    key: url + '/images/' + req.file.originalname + extname
  })


  // cloudinary.uploader.upload(req.file.path, (err, data) => {
  //   console.log(data);
  //   callback(err, {
  //     key: cloudinary.image('images/Screenshot from 2018-02-03 22-15-21.png.png')
  //   });
  // });

  // s3.putObject({
  //   Bucket: aws.bucket,
  //   Key: fileKey,
  //   Body: req.file.buffer,
  //   ACL: 'public-read' // your permisions
  // }, (err, data) => {
  //   callback(err, {
  //     data: data,
  //     key: `https://s3.${aws.region}.amazonaws.com/${aws.bucket}/${fileKey}`
  //   });
  // });
};

module.exports.imageFileFilter = function (req, file, callback) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    let err = new Error();
    err.code = 'UNSUPPORTED_MEDIA_TYPE';
    return callback(err, false);
  }
  callback(null, true);
};
