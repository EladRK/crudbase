'use strict';

const mongoose = require('mongoose');
const seoSchema = require('./seo');

const VerticalSchema = {
  name: {type: String},
  displayName: {type: String, required: true},
  order: Number,
  categories: [{type: mongoose.Schema.Types.ObjectId}],
  products: [{type: Number}],
  defaultSegmentId: mongoose.Schema.Types.ObjectId,
  seoData: seoSchema
};

module.exports = VerticalSchema;
