const Good = require("../model/good.js");
const Token = require("../model/token.js");
const Ordercon = require("../model/ordercon.js");
//商品详情查询功能
const orderlistGet = async function(ctx) {
   	let tokenid = ctx.request.body.tokenid;
   	let username = ctx.request.body.username;
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
  		let orderconget = await Ordercon.find({
            "username" : username,
            "orderstate" : "nopay"
        }).exec()
        if(!orderconget){
        	result.errCode = 2
	        result.errMsg = '没有订单'
	        ctx.body = result
        	return
        }else{
        	result.errCode = 0
	        result.errMsg = '查询订单成功'
	        result.list=orderconget
	        ctx.body = result
        	return
        }
   }   
};
module.exports = orderlistGet;
