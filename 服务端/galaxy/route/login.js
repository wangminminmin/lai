const User = require("../model/user.js");
const Token = require("../model/token.js");
const stringRandom = require('string-random');
    async function login(ctx){
		let username = ctx.request.body.username;
	    let password = ctx.request.body.password;
	    let result = {
	        errCode: 0
	    };
		let user = await User.findOne({
	            username: username,
	            password: password
	        }).exec()  
		if (!user) {
	        result.errCode = 1
	        result.errMsg = '账户或者密码错误！'
	        ctx.body = result
	        return
	   }else {
	        //用户已经存在
	        let token=stringRandom(32);
	        let time=Date.now();
	        let overtime=Date.now()+1000*60*60*24;
	        let seachtoken = await Token.findOne({
	            username: username
	        }).exec()
	        if(!seachtoken){
	        	addtoken = new Token({
		            username: username,              
				    tokenid:  token,
				    gettime: time,
				    overtime: overtime
			    })
			    try {
				    addtoken = await addtoken.save();//写入数据库
			    } catch (e) {
			        result.errMsg = 'token写入失败'
			       	return next
			    }
	        }else{
	        	await Token.update(
	        		{username: username},
	        		{tokenid: token,gettime: time,overtime: overtime}
	        	).exec()
	        }
	        result.errCode = 0
	        result.errMsg = '登录成功！'
	        result.username=username
	        result.tokenID =token
		    ctx.body = result
	    }   
    }
module.exports = login;
