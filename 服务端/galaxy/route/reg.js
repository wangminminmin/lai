const User = require("../model/user.js");
const reg = async function(ctx) {
	let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let telcode = ctx.request.body.telCode;
    let usertel = ctx.request.body.userTel;
    let result = {
        errCode: 0,
    };
	let user = await User.findOne({
            username
        }).exec()
    let tel = await User.findOne({
            usertel
        }).exec()
    if(telcode!=1234){
    	result.errCode = 2
        result.errMsg = '手机号验证码错误！'
        ctx.body = result
        return
    }else{
    	if(!tel){
	    	if (!user) {
	            user = new User({
	                username,
	                password,
	                usertel
	            })
		    } else {
		        //用户已经存在
		        result.errCode = 1
		        result.errMsg = '用户名重复了！请换一个！'
		        ctx.body = result
		        return
		    }
		    try {
		        //写入数据库
		        user = await user.save();
		        result.errCode = 0
		        result.errMsg = '注册成功'
		        ctx.body = result
		    } catch (e) {
		        console.log('md,err==', e)
		    }
	    }else{
	    	result.errCode = 3
	        result.errMsg = '手机号已经被注册！'
	        ctx.body = result
	        return
	    }
    }
};
module.exports = reg;
