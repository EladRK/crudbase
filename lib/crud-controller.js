/**
 * Created by elad.katz on 15/04/2016.
 */
var CrudController = function (entity) {
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

    this.Entity.findOneAndUpdate({"_id": req.params.id}, req.body).then(result => {
        res.json(result);

    }).catch(err => {
        res.statusCode = 500;
        res.send('Database error');
        console.log(err);
    });


};

module.exports = CrudController;