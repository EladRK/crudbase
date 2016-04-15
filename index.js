"use strict";

var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var colors = require('colors/safe');

var db = {};

var modelPath = require("path").join(__dirname, "./model");
var fs = require("fs");

var modelFilenames = fs.readdirSync(modelPath);

var entityNames = modelFilenames.map(filename => filename.slice(0,-3));

entityNames.forEach(entityName => {

    var entity = require(`./model/${entityName}`);

    var entitySchema = new Schema(entity);
    db[entityName] =  mongoose.model(entityName, entitySchema);

});


console.log("\n\n");
console.log(colors.red("Generating CRUD API:"));

var apiPath = '/api/v1/';

for (var entityName in db) {
    console.log(colors.blue(entityName));
    console.log (`GET: \t/${apiPath}${entityName}/`);
    console.log (`GET: \t/${apiPath}${entityName}/:id`);
    console.log (`POST: \t/${apiPath}${entityName}/`);
    console.log (`DELETE: \t/${apiPath}${entityName}/:id`);
    console.log (`PUT: \t/${apiPath}${entityName}/:id`);

    router.get(apiPath + entityName + '/', function (req, res, next) {

        var filter = {};
        if (req.query._filters) {
            filter = JSON.parse(req.query._filters);
        }

        db[entityName].find(filter).then(result => {
            res.json(result);

        });
    });
    router.get(apiPath + entityName + '/:id', function (req, res, next) {

        db[entityName].findById(req.params.id).then(result => {
            res.json(result);

        });
    });
    router.post(apiPath + entityName + '/', function (req, res, next) {

        var data = req.body;


        var entity = new db[entityName](data);
        entity.save((result) => {
            res.json(result);
        });


    });
    router.delete(apiPath + entityName + '/:id', function (req, res, next) {

        db[entityName].remove({"_id": req.params.id}).then(result => {
            res.json(result);

        });
    });
    router.put(apiPath + entityName + '/:id', function (req, res, next) {


        db[entityName].findOneAndUpdate({"_id": req.params.id}, req.body).then(result => {
            res.json(result);

        });

    });

    console.log("\n")
}

console.log(colors.red(`Total ${entityNames.length} entities.\n`));

app.use('/', router);

app.use(express.static('public'));
app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/node_modules/ng-admin/build/', express.static(__dirname + '/node_modules/ng-admin/build/'));


mongoose.connect('mongodb://localhost/umb-simple');

var port = 6100;
app.listen(port, function () {
    console.log('Environment: ' + process.env.NODE_ENV);
    console.log('Running on port: ' + port);
});
