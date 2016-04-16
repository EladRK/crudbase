/**
 * Created by lod.lawson on 3/10/16.
 */
'use strict';
const seoConstraints = {
  description: {
    presence: true,
    length: {maximum: 155}
  },
  canonical: {
    presence: true,
    length: {maximum: 65}
  },
  index: {
    presence: true,
    inclusion: ['true', 'false', true, false]
  },
  follow: {
    presence: true,
    inclusion: ['true', 'false', true, false]

  },
  title: {
    presence: true
  }
};

module.exports = seoConstraints;
