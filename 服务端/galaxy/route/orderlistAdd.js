const Good = require("../model/good.js");
const Token = require("../model/token.js");
const Orderlist = require("../model/orderlist.js");
const Ordercon = require("../model/ordercon.js");
//订单添加功能
const orderlistAdd = async function(ctx) {
   	let tokenid = ctx.request.body.tokenid;
   	let username = ctx.request.body.username;
    let orderprice = ctx.request.body.orderprice;
    let goodname=ctx.request.body.goodname;
    let goodprice=ctx.request.body.goodprice;
    let goodnum=ctx.request.body.goodnum;
    let goodauthor=ctx.request.body.goodauthor;
    let goodpublish=ctx.request.body.goodpublish;
    let goodintr=ctx.request.body.goodintr;
	let goodpic=ctx.request.body.goodpic;
	let orderid=ctx.request.body.orderid;
    let creattime = Date.now();
    let result = {
        errCode: 0
    };
	let seachtoken = await Token.findOne({
            tokenid: tokenid
        }).exec()
	if (!seachtoken||seachtoken.overtime<creattime) {
        result.errCode = 1
        result.errMsg = '登录超时或者未登录，请重新登录'
        ctx.body = result
        return
  }else {
  		orderlistadd = new Orderlist({
            username,
            orderprice,
            creattime,
            orderstate:"nopay"
        })
        orderlistadd = await orderlistadd.save();
        let orderlistid=orderlistadd._id;
        orderconadd = new Ordercon({
            'username' : username,
            'orderid' : orderlistid,
		    'orderprice' : orderprice,
		    'creattime' : creattime,
		    'orderstate' : "nopay",
		    'goodname' : goodname,
		    'goodauthor' : goodauthor,
		    'goodpublish' : goodpublish,
		    'goodnumber' : goodnum,
		    'goodprice' : goodprice,
		    'goodintr' : goodintr,
		    'goodpic' : goodpic
        })
        orderconadd = await orderconadd.save();
        result.errCode = 0
        result.errMsg = '订单增加成功'
        ctx.body = result
        return
   }   
};
module.exports = orderlistAdd;
