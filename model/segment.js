'use strict';

const mongoose = require('mongoose');
const seoSchema = require('./seo');

const SegmentSchema = {
  name: String,
  displayName: {type: String, required: true},
  verticalId: mongoose.Schema.Types.ObjectId,
  seoData: seoSchema,
  pageTypes: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  order: Number
};

module.exports = SegmentSchema;
