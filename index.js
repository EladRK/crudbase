
var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var colors = require('colors/safe');

var entities = {};
var db = {};

var modelPath = require("path").join(__dirname, "./model");
var fs = require("fs");

console.log("\n\n");
console.log(colors.red("Reading Model:"));

fs.readdirSync(modelPath).forEach(function(file) {

    var entityName = file.slice(0, -3);
    if (entityName === 'index') return;

    entities[entityName] = require(`./model/${entityName}`);

    var entitySchema = new Schema(entities[entityName]);
    db[entityName] =  mongoose.model(entityName, entitySchema);

    console.log(colors.blue(entityName));

    for(propertyName in entities[entityName]) {
        console.log(" + " + propertyName);
    }

    console.log("\n");
});


console.log("\n\n");
console.log(colors.red("Generating CRUD API:"));

var apiPath = 'api/v1';

for (entityName in db) {
    console.log(colors.blue(entityName));

    router.get(entityName + '/', function (req, res, next) {

        var filter = {};
        if (req.query._filters) {
            filter = JSON.parse(req.query._filters);
        }

        db[entityName].find(filter).then(result => {
            res.json(result);

        });
    });
    console.log (`GET: \t/${apiPath}/${entityName}/`);

    router.get(entityName + '/:id', function (req, res, next) {

        db[entityName].findById(req.params.id).then(result => {
            res.json(result);

        });
    });
    console.log (`GET: \t/${apiPath}/${entityName}/:id`);

    router.post(entityName + '/', function (req, res, next) {

        var data = req.body;


        var entity = new db[entityName](data);
        entity.save((result) => {
            res.json(result);
        });


    });
    console.log (`POST: \t/${apiPath}/${entityName}/`);

    router.delete(entityName + '/:id', function (req, res, next) {

        db[entityName].remove({"_id": req.params.id}).then(result => {
            res.json(result);

        });
    });
    console.log (`DELETE: \t/${apiPath}/${entityName}/:id`);

    router.put(entityName + '/:id', function (req, res, next) {


        db[entityName].findOneAndUpdate({"_id": req.params.id}, req.body).then(result => {
            res.json(result);

        });

    });
    console.log (`PUT: \t/${apiPath}/${entityName}/:id`);

    console.log("\n\n")
}


app.use('/api/v1', router);

var port = 6100;
app.listen(port, function () {
    console.log('Environment: ' + process.env.NODE_ENV);
    console.log('Running on port: ' + port);
});
