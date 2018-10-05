
$(function(){
	$.ajax({
		url:"http://localhost:3000/goodslist",
		data:{
			type:"1",
			num:5
		},
		async:true,
		type:"GET",
		success:function(result){
			var html="";
		    for(var i=0;i<=result.list.length-1;i++){
	    	html+='<li><a href="detail.html?id='+result.list[i]._id+'"><em><img src="'+result.list[i].goodpic+'"/></em><span>'+result.list[i].goodname+'</span><span>￥'+result.list[i].goodprice+'</span><span>'+result.list[i].gooddiscuss.gooddiscusser.length+'条评论  <i>98%好评</i></span></a></li>'
		    }
		    $("#goods-list").html(html)
	}});
})

