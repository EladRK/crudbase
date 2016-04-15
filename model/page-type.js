'use strict';

const ObjectIdType = require('mongoose').Schema.Types.ObjectId;
const PageTypeSchema = {
  id: ObjectIdType,
  name: String,
  layoutName: String,
  themeName: String,
  components: [{
    type: String,
    placeholder: String,
    route: String
  }],
  default: Boolean
};

module.exports = PageTypeSchema;
