"use strict";
const CrudbaseApp = function (options){

  this.options = options;
    
  this.options.port = this.options.port || 6100;
  this.options.env = this.options.env || process.env.NODE_ENV;
  this.options.modelNameArray = this.options.modelNameArray || null;

  this.app = {};
  this.db = 'still nothing';
  this.routes = 'still nothing';

//   console.log(this.options);
//   console.log(this.db);
  const express = require('express');
  const colors = require('colors');
  this.app = express();

  const bodyParser = require('body-parser');
  this.app.use(bodyParser.json());

  const logger = function(req, res, next) {
    console.log(colors.blue(new Date().toLocaleString()) + " : " + colors.green(req.method) + " : " + req.url);

    next(); 
  };

  this.app.use(logger);
    
  const entityLoader = require('./lib/entity-loader');
  this.db = entityLoader(this.options.modelNameArray);

  const createRoutes = require('./lib/schema-to-routes'); 
  this.routes = createRoutes(this.db);
  
  this.app.use(this.routes);

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

CrudbaseApp.prototype.stop = () => {
  this.app.stop();
};

module.exports = CrudbaseApp;
