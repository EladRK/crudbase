"use strict";

function App(){
    let options = {
        port: 6100,
        env: process.env.NODE_ENV
    };
    let app;

}

App.prototype.bootstrap = function bootstrap() {

    var express = require('express');
    this.app = express();

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    var entityLoader = require('./model/entity-loader');
    var schemaToRoutes = require('./lib/schema-to-routes');
    app.use('/', schemaToRoutes(entityLoader));


    app.use(express.static('public'));

    app.use('/angular', express.static(__dirname + '/node_modules/angular/'));
    app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
    app.use('/node_modules/ng-admin/build/', express.static(__dirname + '/node_modules/ng-admin/build/'));

};
App.prototype.run = () => {
    app.listen(this.options.port, () => {
        console.log('Environment: ' + this.options.env);
        console.log('Running on port: ' + this.options.port);
    });

};
App.prototype.stop = () => {
    this.app.stop();
};



module.exports = new App();
