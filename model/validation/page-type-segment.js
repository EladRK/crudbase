'use strict';

const constraints = {
  name: {
    presence: true,
    format: {
      pattern: '[a-zA-Z0-9\-_]+',
      message: 'LayoutName can only contain letters, numbers and dashes'
    }
  },
  displayName: {
    presence: true
  },
  segmentId: {
    presence: true
  },
  pageTypeId: {
    presence: true
  },
  order: {
    presence: true
  }
};

module.exports = constraints;
