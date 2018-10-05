const Good = require("../model/good.js");
//商品列表查询功能
const goodslist = async function(ctx) {
	let ctx_query = ctx.query;
	let num = Number(ctx_query.num);
	let type = ctx_query.type;
    let result = {
        errCode: 0
    };
	let goods = await Good.find({goodtype: type}).limit(num);
	if(!goods){
		result.errCode = 1
        result.errMsg = '没有找到查询结果'
        ctx.body = result
        return
	}else{
		result.errCode = 0
        result.errMsg = '查询到结果'
        result.list=goods
        ctx.body = result
        return
	}
};
module.exports = goodslist;
