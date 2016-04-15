/**
 * Created by elad.katz on 15/04/2016.
 */

//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var history_repo_url = 'mongodb://localhost:27017/umb-simple-history';


var mongoose = require('mongoose');
var mongooseHistory = require('mongoose-history');
var historical = require('historical');
var Schema = mongoose.Schema;
var fs = require("fs");

var db = {};

var modelPath = require("path").join(__dirname, "../model");

var modelFileNames = fs.readdirSync(modelPath);

var entityNames = modelFileNames.map(filename => filename.slice(0, -3));

function lastModifiedPlugin (schema, options) {
    schema.add({ lastMod: Date });

    schema.pre('save', function (next) {
        this.lastMod = new Date;
        next();
    });

    if (options && options.index) {
        schema.path('lastMod').index(options.index);
    }
}

entityNames.forEach(entityName => {

    var model = require(`../model/${entityName}`);

    var entitySchema = new Schema(model);

    entitySchema.plugin(lastModifiedPlugin);

    //entitySchema.plugin(mongooseHistory);

    //entitySchema.plugin(require('historical'), {
    //    connection: mongoose.createConnection('mongodb://localhost/umb-simple'),
    //    name: null,
    //    primaryKeyName: null,
    //    primaryKeyType: null
    //});

    //entitySchema.plugin(schema => {
    //    schema.pre('save', function (next) {
    //        this.set('updatedAt', Date.now());
    //        next()
    //    });
    //
    //    schema.post('save', function(doc) {
    //        console.log('%s has been saved', doc._id);
    //        console.log(doc);
    //
    //        //MongoClient.connect(history_repo_url, function(err, db) {
    //        //    assert.equal(null, err);
    //        //    db.collection(entityName + '_history').insertOne(doc);
    //        //    db.close();
    //        //});
    //
    //    });
    //
    //});

    db[entityName] = mongoose.model(entityName, entitySchema);

});

mongoose.connect('mongodb://localhost/umb-simple');


module.exports = db;

