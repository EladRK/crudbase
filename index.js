"use strict";

function bootstrap(options) {
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var colors = require('colors/safe');


    app.use(bodyParser.json());
    var db = require('./lib/db');
    var createCrudRoutes = require('./lib/crud-routes');

    var crudRoutes = createCrudRoutes(db);
    app.use('/', crudRoutes);


    app.use(express.static('public'));
    app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
    app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
    app.use('/node_modules/ng-admin/build/', express.static(__dirname + '/node_modules/ng-admin/build/'));

    app.listen(port, function () {
        console.log('Environment: ' + options.env);
        console.log('Running on port: ' + options.port);
    });
}

bootstrap({
    port: 6100,
    env: process.env.NODE_ENV
});
