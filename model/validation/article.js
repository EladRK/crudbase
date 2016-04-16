'use strict';

const seoConstraints = require('./seo');
const constraints = {
  segmentId: {
    presence: true
  },
  verticalId: {
    presence: true
  },
  title: {
    presence: true
  },
  name: {
    presence: true,
    format: {
      pattern: '[a-z0-9\-]+',
      message: 'name can only contain letters, numbers and dashes'
    }
  },
  authorId: {
    presence: true
  },
  brief: {
    presence: true
  },
  tagId: {
    presence: true
  },
  // thumbnail
  'thumb.url': {
    presence: true,
    url: true
  },
  'thumb.alt': {
    presence: true
  },
  'thumb.title': {
    presence: true
  },
  updateDate: {
    datetime: true
  }
};

for (const seoField in seoConstraints) {
  if (seoConstraints.hasOwnProperty(seoField)) {
    constraints[`seo.${seoField}`] = seoConstraints[seoField];
  }
}

module.exports = constraints;
