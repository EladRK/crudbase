'use strict';

const constraints = {
  linkId: {presence: true},
  priceCurrency: {
    inclusion: {
      within: ['USD', 'GBP', 'AUD', 'EUR'],
      message: 'invalid value for price currency'
    }
  }
};

module.exports = constraints;
