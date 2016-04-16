'use strict';

const constraints = {
  name: {
    presence: true,
    format: {
      pattern: '[a-zA-Z0-9\-_]+',
      message: 'Name can only contain letters, numbers and dashes'
    }
  },
  layoutName: {
    presence: true,
    format: {
      pattern: '[a-zA-Z0-9\-_]+',
      message: 'LayoutName can only contain letters, numbers and dashes'
    }
  },
  themeName: {
    presence: true,
    format: {
      pattern: '[a-zA-Z0-9\-_]+',
      message: 'ThemeName can only contain letters, numbers and dashes'
    }
  }
};

module.exports = constraints;
