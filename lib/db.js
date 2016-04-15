/**
 * Created by elad.katz on 15/04/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require("fs");

var db = {};

var modelPath = require("path").join(__dirname, "../model");

var modelFileNames = fs.readdirSync(modelPath);

var entityNames = modelFileNames.map(filename => filename.slice(0, -3));

entityNames.forEach(entityName => {

    var entity = require(`../model/${entityName}`);

    var entitySchema = new Schema(entity);
    db[entityName] = mongoose.model(entityName, entitySchema);

});


module.exports = db;

