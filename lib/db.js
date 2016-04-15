
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

    db[entityName] = mongoose.model(entityName, entitySchema);

});

mongoose.connect('mongodb://localhost/umb-simple');


module.exports = db;

