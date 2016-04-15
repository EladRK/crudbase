'use strict';

const objectId = require('mongoose').Schema.Types.ObjectId;
const seoSchema = require('./seo');

module.exports = {
    segmentId: objectId,
    authorId: objectId,
    title: String,
    brief: String,
    body: String,
    seo: seoSchema,
    verticalId: objectId,
    name: String,
    tagId: [{type: objectId}],
    thumb: {},
    createDate: Date,
    updateDate: Date
};;
