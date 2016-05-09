var mongooseHistory = require('mongoose-history');
 
    
function addPlugins(entitySchema) {
    
    entitySchema.plugin(schema => {

        schema.add({lastMod: Date});

        schema.pre('save', function (next) {
            this.lastMod = new Date;
            console.log('pre save hook ' + this.lastMod);
            next();
        });
        schema.post('save', function (doc) {
            console.log('%s has been saved', doc._id);
            //console.log(doc);

        });

    });

    entitySchema.plugin(mongooseHistory);

}   

module.exports.addPlugins = addPlugins; 
    