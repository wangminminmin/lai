let mongoose = require('../mong/mongo.js'),   
    Schema = mongoose.Schema;      
let GoodSchema = new Schema({ 
    goodname : { type: String },              
    goodtype: {type: String}
});
module.exports = mongoose.model('Good',GoodSchema)