'use strict';

const objectId = require('mongoose').Schema.Types.ObjectId;

const pageTypesSegmentsSchema = {
  segmentId: objectId,
  pageTypeId: objectId,
  order: Number,
  displayName: String, // PageType menu name
  name: String // PageType override name
};

module.exports = pageTypesSegmentsSchema;
