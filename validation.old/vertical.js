'use strict';

const seoConstraints = require('./seo');
const constraints = {
  name: {
    presence: true
  },
  displayName: {
    presence: true
  },
  products: {
    presence: true
  },
  categories: {
    isArray: true
  },
  seoData: {
    presence: true
  }
};

for (const seoField in seoConstraints) {
  if (seoConstraints.hasOwnProperty(seoField)) {
    constraints[`seoData.${seoField}`] = seoConstraints[seoField];
  }
}

module.exports = constraints;
