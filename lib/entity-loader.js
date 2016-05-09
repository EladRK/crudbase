"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require("fs");

var db = {};

var modelPath = require("path").join(__dirname, "./../model/schema");
var modelFileNames = fs.readdirSync(modelPath);
var entityNames = modelFileNames.map(filename => filename.slice(0, -3));

entityNames.forEach(entityName => {

    var model = require(`./../model/schema/${entityName}`);
    var entitySchema = new Schema(model);

    var plugins = require('./model-plugins');
    
    plugins.addPlugins(entitySchema);

    db[entityName] = mongoose.model(entityName, entitySchema);
});

mongoose.connect('mongodb://localhost/umb-simple');

module.exports = db;

