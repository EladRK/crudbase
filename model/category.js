'use strict';

const mongoose = require('mongoose');

const CategorySchema = {
  siteId: Number,
  displayName: {type: String, required: true},
  name: String,
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories'
  },
  order: Number
};

module.exports = CategorySchema;
