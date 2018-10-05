let mongoose = require('../mong/mongo.js'),    //加载mongoose对象
    Schema = mongoose.Schema;      
let UserSchema = new Schema({        
    username : { type: String },              
    password: {type: String},
    usertel: {type: String}  
});
module.exports = mongoose.model('User',UserSchema)
