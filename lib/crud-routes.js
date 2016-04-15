"use strict";


var express = require('express');
var router = express.Router();

var CrudController = require('./crud-controller');



function createCrudRoutes(db) {


    for (var entityName in db) {
        if (!db.hasOwnProperty(entityName)) continue;

        var controller = new CrudController(db[entityName]);

        var baseUrl = '/api/v1/' + entityName + "/";

        router.get(baseUrl, controller.index.bind(controller));
        router.get(baseUrl + ':id', controller.get.bind(controller));
        router.post(baseUrl, controller.create.bind(controller));
        router.delete(baseUrl, controller.delete.bind(controller));
        router.put(baseUrl + ':id', controller.update.bind(controller));

    }

    return router;

}

module.exports = createCrudRoutes;