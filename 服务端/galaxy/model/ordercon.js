let mongoose = require('../mong/mongo.js'),    //加载mongoose对象
    Schema = mongoose.Schema;      
let OrderconSchema = new Schema({
	orderid:{ type: String },
    username : { type: String },
    orderprice : {type: Number},
    creattime : { type: Date},
    orderstate : { type: String },
    goodname : { type: String },
    goodauthor : { type: String },
    goodpublish : { type: String },
    goodnumber : {type: Number},
    goodprice : {type: Number},
    goodintr : { type: String },
    goodpic : { type: String }
});
module.exports = mongoose.model('Ordercon',OrderconSchema) 
