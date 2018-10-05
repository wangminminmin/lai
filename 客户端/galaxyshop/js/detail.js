$(function(){
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
	var id=(GetQueryString("id"));
	$.ajax({
		url:url+"/good",
		data:{
			id:id
		},
		async:true,
		type:"GET",
		success:function(result){
			goodauthor=result.list.goodauthor;
			goodpublish=result.list.goodpublish;
			goodintr=result.list.goodintr;
			goodpic=result.list.goodpic;
			$("#goods-name").text(result.list.goodname);
			$("#goods-price").text(result.list.goodsprice);
			$("#goodsmajor").text(result.list.goodsmajor);
			$("#good-pic").attr("src",url+result.list.goodpic);
			$("#good-discuss-num").text("("+result.list.gooddiscuss.gooddiscusscon.length+")");
			$("#good-detail1").html('<img src='+url+result.list.gooddetail+'>');
			$("#good-detail2").html('<img src='+url+result.list.goodparameter+'>');
			var html="";
			for(var i=0;i<=result.list.gooddiscuss.gooddiscusscon.length-1;i++){
				html+='<div id="gooddiscusser">'+result.list.gooddiscuss.gooddiscusser[i]+'</div><div id="gooddiscusscon">'+result.list.gooddiscuss.gooddiscusscon[i]+'</div>'
			}
			$("#good-detail3").html(html);
	}});
	
	$(".addCart").click(function(){
		var num=$("#num").val();
		var goodsprice=$("#goods-price").text();
		var orderprice=goodsprice*num;
		var tokenid=localStorage.getItem("tokenID");
		var username=localStorage.getItem("username");
		var goodname=$("#goods-name").text();
		$.ajax({
		url:url+"/orderlistAdd",
		data:{
			tokenid:tokenid,
			username : username,
		    orderprice : orderprice,
		    goodname : goodname,
		    goodprice:goodsprice,
		    goodnum : num,
			goodauthor : goodauthor,
		    goodpublish : goodpublish,
		    goodintr : goodintr,
		    goodpic : goodpic
		},
		async:true,
		type:"POST",
		success:function(result){
			if(result.errCode==1){
				alert(result.errMsg);
				window.location.href="login.html"
			}else{
				$(".addCart").attr("disabled","disabled");
				$(".addCart").text("已下单");
			}
		}});
	})
	$(".gopay").click(function(){
		window.location.href="cart.html"
	})
})
