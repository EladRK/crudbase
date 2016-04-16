/**
 * Created by lod.lawson on 3/10/16.
 */
'use strict';
const seoConstraints = {
  metaTagsDescription: {
    presence: true,
    length: {maximum: 155}
  },
  metaTagsCanonical: {
    presence: true,
    length: {maximum: 65}
  },
  metaTagsIndex: {
    presence: true,
    inclusion: ['true', 'false', true, false]
  },
  metaTagsFollow: {
    presence: true,
    inclusion: ['true', 'false', true, false]

  },
  metaTagsTitle: {
    presence: true,
    length: {maximum: 65}
  },
  h1TextInPage: {
    presence: true,
    length: {maximum: 65}
  }
};

module.exports = seoConstraints;
