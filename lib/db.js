"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require("fs");

var db = {};

var modelPath = require("path").join(__dirname, "../model");

var modelFileNames = fs.readdirSync(modelPath);

var entityNames = modelFileNames.map(filename => filename.slice(0, -3));


entityNames.forEach(entityName => {

    var model = require(`../model/${entityName}`);

    var entitySchema = new Schema(model);

    entitySchema.plugin(schema => {

        schema.add({lastMod: Date});

        schema.pre('save', function (next) {
            this.lastMod = new Date;
            console.log('pre save hook ' + this.lastMod);
            next();
        });
        schema.post('save', function (doc) {
            console.log('%s has been saved', doc._id);
            console.log(doc);

        });

    });

    db[entityName] = mongoose.model(entityName, entitySchema);
});

mongoose.connect('mongodb://localhost/umb-simple');


module.exports = db;

