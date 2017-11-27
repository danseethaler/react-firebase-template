const functions = require('firebase-functions');
const thumbnailModule = require('./thumbnail');
const metadataModule = require('./examples/metadata');

const bucketOb = functions.storage
  .bucket('react-firebase-template.appspot.com')
  .object();

// exports.thumbnail = bucketOb.onChange(thumbnailModule.handler);
// exports.metadata = bucketOb.onChange(metadataModule.handler);
