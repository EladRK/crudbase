'use strict';

const ObjectIdType = require('mongoose').Schema.Types.ObjectId;
const seoSchema = require('./seo');

module.exports = {
    segmentId: ObjectIdType,
    authorId: ObjectIdType,
    title: String,
    brief: String,
    body: String,
    seo: seoSchema,
    verticalId: ObjectIdType,
    name: String,
    tagId: [{type: ObjectIdType}],
    thumb: {},
    createDate: Date,
    updateDate: Date
};;
