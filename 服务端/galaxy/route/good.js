const Good = require("../model/good.js");
//商品详情查询功能
const good = async function(ctx) {
	let ctx_query = ctx.query;
	let id=ctx_query.id;
    let result = {
        errCode: 0
    };
	let goods = await Good.findById(id);
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
module.exports = good;
