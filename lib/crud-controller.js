"use strict";

const _ = require("underscore");


const CrudController = function (entity) {
  this.Entity = entity;
};

CrudController.prototype.index = function (req, res) {
  var filter = {};
  if (req.query._filters) {
    filter = JSON.parse(req.query._filters);
  }

  this.Entity.find(filter)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.statusCode = 500;
      res.send('Database error');
      console.log(err);
    });
};
CrudController.prototype.get = function (req, res) {
  this.Entity.findById(req.params.id).then(result => {
    res.json(result);
  }).catch(err => {
    res.statusCode = 500;
    res.send('Database error');
    console.log(err);
  });
};
CrudController.prototype.create = function (req, res) {
  var data = req.body;

  var newEntity = new this.Entity(data);
  newEntity.save((result) => {
    res.json(result);
  }).catch(err => {
    res.statusCode = 500;
    res.send('Database error');
    console.log(err);
  });


};
CrudController.prototype.delete = function (req, res) {

  this.Entity.remove({"_id": req.params.id}).then(result => {
    res.json(result);

  }).catch(err => {
    res.statusCode = 500;
    res.send('Database error');
    console.log(err);
  });

};
CrudController.prototype.update = function (req, res) {
  var data = req.body;

  // mongoose update can't be hooked into, and should only be used for bulk updates
  // see: https://github.com/Automattic/mongoose/issues/538

  this.Entity.findById(req.params.id).then(entity => {
    entity = _.extend(entity, data);

    entity.save((result) => {
      res.json(result);

    }).catch(err => {
      res.statusCode = 500;
      res.send('Database error');
      console.log(err);
    });
  });
};

module.exports = CrudController;