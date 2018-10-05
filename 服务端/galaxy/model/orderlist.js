let mongoose = require('../mong/mongo.js'),    //加载mongoose对象
    Schema = mongoose.Schema;      
let OrderlistSchema = new Schema({
	id:{ type: String },
    username: { type: String },              
    orderprice: {type: Number},
    creattime: {type: Date},
    orderstate: {type: String}
});
module.exports = mongoose.model('Orderlist',OrderlistSchema)
