$(function(){
	//图片验证码功能
	var verifyCode = new GVerify("v_container");
	var telreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	$("#button").click(function(){
		var res = verifyCode.validate($("#code_input").val());
		var userName=$("#userName").val();
		var userPass=$("#userPass").val();
		var userPassAg=$("#userPassAg").val();
		var tel=$("#tel").val();
		var telCode=$("#telCode").val();
		if(!res){
			$("#tip").html("图片验证码错误，请重新输入！")
		}else{
			if(userName.length<6||userName.length>16 || userName==""){
				$("#tip").html("用户名必须为6-16位字符，请重新输入！")
			}else if(userPass.length<6||userPass.length>16 || userPass==""){
				$("#tip").html("密码必须为6-16位字符，请重新输入！")
			}else if(userPass!=userPassAg){
				$("#tip").html("密码与重复密码必须相同，请重新输入！")
			}else if(!telreg.test(tel)){
				$("#tip").html("手机号格式错误，请重新输入！")
			}else if(telCode==""){
				$("#tip").html("请输入手机验证码！")
			}else{
				$("#tip").html("");
				$.ajax({
					url:url+"/reg",
					data:{
						username:userName,
						password:userPass,
						userTel:tel,
						telCode:telCode
					},
					async:true,
					type:"POST",
					success:function(result){
					  	switch(result.errCode){
						case 0:
						  $("#tip").html("注册成功！进入登录页面") ;
						  window.location.href="login.html";
						  break;
						case 1:
						  $("#tip").html(result.errMsg) 
						  break;
						case 2:
						  $("#tip").html(result.errMsg) 
						  break;
						case 3:
						  $("#tip").html(result.errMsg) 
						  break;
						}
				}});
			}
		}
	})	
	//注册按钮倒计时
	$("#regButton").click(function(){
		$(this).attr("disabled","disabled").addClass("disable");
		var t=60;
		$("#regButton").html(t+"秒后可以再次发送");
		var time=setInterval(function(){
			t--;
			$("#regButton").html(t+"秒后可以再次发送");
			if(t==0){
				clearInterval(time);
$("#regButton").removeAttr("disabled").removeClass("disable").html("点击获取手机验证码");
			}
		},1000)
	})
})
