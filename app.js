"use strict";

const options = {
    port: 6100,
    env: process.env.NODE_ENV
};


function App(){
    let app;
}

App.prototype.run = function run() {

    var express = require('express');
    var colors = require('colors');
    this.app = express();

    var bodyParser = require('body-parser');
    this.app.use(bodyParser.json());

    var logger = function(req, res, next) {
        console.log(colors.blue(new Date().toLocaleString()) + " : " + colors.green(req.method) + " : " + req.url);

        next(); 
    }

    this.app.use(logger);

    var entityLoader = require('./model/entity-loader');
    var schemaToRoutes = require('./lib/schema-to-routes');
    this.app.use('/', schemaToRoutes(entityLoader));


    this.app.use(express.static('public'));

    this.app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
    this.app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
    this.app.use('/node_modules/ng-admin/build/', express.static(__dirname + '/node_modules/ng-admin/build/'));



    this.app.listen(options.port, function () {
        console.log(
            colors.red(new Date().toLocaleString()) + " : " +
            colors.cyan('Environment: ' + options.env) + " : " + 
            colors.cyan('Running on port: ' + options.port)
        );
        
    });

};
App.prototype.stop = () => {
    this.app.stop();
};

var umbBackOffice = new App();
umbBackOffice.run();

module.exports = umbBackOffice;
