let mongoose = require('../mong/mongo.js'), 
    Schema = mongoose.Schema;      
let TokenSchema = new Schema({ 
    username: { type: String },              
    tokenid: {type: String},
    gettime: {type: Date},
    overtime: {type: Date}
});
module.exports = mongoose.model('Token',TokenSchema) 
