$(function(){
	var tokenid=localStorage.getItem("tokenID");
	var username=localStorage.getItem("username");
	$.ajax({
		url:url+"/orderlistGet",
		data:{
			username:username,
			tokenid :tokenid
		},
		async:true,
		type:"POST",
		success:function(result){
			if(result.errCode==1){
				alert(result.errMsg);
				window.location.href="login.html"
			}else if(result.errCode==0){
				var noPayNum=result.list.length;
				$("#nopay").html("待付款("+noPayNum+")");
			}
	}});
})
