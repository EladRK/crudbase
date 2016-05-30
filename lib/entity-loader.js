"use strict";

var loadEntities = function(modelNameArray){
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var fs = require("fs");

  var db = {};

  var modelPath = require("path").join(__dirname, "./../model/schema");
  var modelFileNames = fs.readdirSync(modelPath);
  var entityNames = modelFileNames.map(filename => filename.slice(0, -3));

  if(modelNameArray) { 
    entityNames = modelNameArray; 
  }
    
  var addPlugins = require('./model-plugins');
    
  entityNames.forEach(entityName => {
    var model = require(`./../model/schema/${entityName}`);
    var entitySchema = new Schema(model);

    addPlugins(entitySchema);

    db[entityName] = mongoose.model(entityName, entitySchema);
  });

  mongoose.connect('mongodb://localhost/umb-simple');
    
  return db;
};

module.exports = loadEntities;

