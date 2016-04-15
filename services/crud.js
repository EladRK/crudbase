"use strict";


function requireDb() {
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

    return db;
}

function createCrudRoutes() {
    var express = require('express');

    var router = express.Router();
    var db = requireDb();

    for (var entityName in db) {
        if (!db.hasOwnProperty(entityName)) continue;

        (function(entityName) {

            var apiPath = '/api/v1/';

            var baseUrl = apiPath + entityName + "/";

            router.get(baseUrl, function (req, res) {
                var filter = {};
                if (req.query._filters) {
                    filter = JSON.parse(req.query._filters);
                }

                db[entityName].find(filter).then(result => {
                    res.json(result);

                });
            });
            router.get(baseUrl + ':id', function (req, res) {
                db[entityName].findById(req.params.id).then(result => {
                    res.json(result);

                });
            });
            router.post(baseUrl, function (req, res) {
                var data = req.body;

                var newEntity = new db[entityName](data);
                newEntity.save((result) => {
                    res.json(result);
                });


            });
            router.delete(baseUrl, function (req, res) {

                db[entityName].remove({"_id": req.params.id}).then(result => {
                    res.json(result);

                });
            });
            router.put(baseUrl + ':id', function (req, res) {

                db[entityName].findOneAndUpdate({"_id": req.params.id}, req.body).then(result => {
                    res.json(result);

                });

            });

        })(entityName);

    }

    return router;

}

const crudService = {
    createCrudRoutes
}

module.exports = crudService;