const Good = require("../model/good.js");
const Token = require("../model/token.js");
const Ordercon = require("../model/ordercon.js");
const Orderlist = require("../model/orderlist.js");
const ObjectId = require('mongodb').ObjectID;
//订单删除功能
const orderRemove = async function(ctx) {
   	let tokenid = ctx.request.body.tokenid;
   	let orderid = ctx.request.body.orderid;
   	let nowtime = Date.now();
    let result = {
        errCode: 0
    };
	let seachtoken = await Token.findOne({
            tokenid : tokenid
        }).exec()
	if (!seachtoken||seachtoken.overtime<nowtime) {
        result.errCode = 1
        result.errMsg = '登录超时或者未登录，请重新登录'
        ctx.body = result
        return
  }else {
  		console.log(orderid)
		let ordercondelete = await Ordercon.deleteOne({
            orderid : orderid
        }).exec()
        let orderlistdelete = await Orderlist.deleteOne({
            _id : ObjectId(orderid)
        }).exec()
    	result.errCode = 0
        result.errMsg = '订单删除成功'
        ctx.body = result
    	return
   }   
};
module.exports = orderRemove;
