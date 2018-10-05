$(function() {
	var totolprice = 0;
	var tokenid = localStorage.getItem("tokenID");
	var username = localStorage.getItem("username");
	$.ajax({
		url: url + "/orderlistGet",
		data: {
			username: username,
			tokenid: tokenid
		},
		async: true,
		type: "POST",
		success: function(result) {
			if(result.errCode == 0) {
				var html = "";
				for(var i = 0; i <= result.list.length - 1; i++) {
					html += '<div class="cart-list"><div class="cart-hd"><input type="checkbox" /><em>' + result.list[i].goodname + '</em></div><div class="cart-items"><dl><dt><img src="' + url + result.list[i].goodpic + '"/></dt><dd>名称：' + result.list[i].goodname + '</dd><dd>编著：' + result.list[i].goodauthor + '</dd><dd>出版：' + result.list[i].goodpublish + '</dd><dd>简介：' + result.list[i].goodintr + '</dd><dd class="price">定价：￥<span>' + result.list[i].goodprice + '</span></dd></dl><div class="icon-del del-item" rel=' + result.list[i].orderid + '></div></div><div class="subtotal"><span class="total-price">小计：<em>￥<span class="subtotalcon">' + result.list[i].orderprice + '</span></em></span><span class="count"><a href="#" class="icon-minus minus"></a><input type="number" value="' + result.list[i].goodnumber + '"/><a href="#" class="icon-add add"></a></span></div></div>';
					totolprice += Number(result.list[i].orderprice);
				};
				$(".container").html(html);
				$("#totaprice").html(totolprice);
			}
			if(result.errCode == 1) {
				alert(result.errMsg);
				window.location.href = "login.html"
			}
		}
	});
	$(".container").delegate(".icon-add", "click", function() {
		var price = $(this).parent().parent().prev().children().children('.price').children('span').html() // 获取定价
		var count = $(this).prev().val(); // 获取当前数量表单中的值
		$(this).prev().val(parseInt(count) + 1); // 数量加1
		var countNew = $(this).prev().val(); // 储存新值
		var total = price * countNew; // 计算总价
		$(this).parents(".subtotal").find(".subtotalcon").text(total); // 显示小计
		getTotaPrice();

	})

	$(".container").delegate(".icon-minus", "click", function() {
		var price = $(this).parent().parent().prev().children().children('.price').children('span').html() // 获取定价
		var count = $(this).next().val(); // 获取当前数量表单中的值
		var total = price * (count - 1); // 计算总价
		if(count <= 1) { // 判断不能为负数
			count = 1;
		} else {
			$(this).next().val(parseInt(count) - 1); // 数量减1
			$(this).parents(".subtotal").find(".subtotalcon").text(total);
			// 显示小计
			getTotaPrice();
		}
	})
	//定义获得总价的函数
	function getTotaPrice() {
		totolprice = 0;
		for(var i = 0; i < $(".subtotalcon").length; i++) {
			totolprice += Number($(".subtotalcon").eq(i).text())
		}
		$("#totaprice").text(totolprice);
	}
	
	$(".container").delegate(".icon-del","click",function(){
		var orderid=$(this).attr("rel");
		var thisItem=$(this);
		$('.modals').css('display','block');
		$('.ok').click(function(){
			$('.modals').css('display','none');
			$.ajax({
				url:url+"/orderRemove",
				data:{
					tokenid :tokenid,
					orderid:orderid
				},
				async:true,
				type:"POST",
				success:function(result){
					if(result.errCode==0){
						location.reload();
					}
			}});
		})
	})	
	$('.cancel').click(function(){
		$('.modals').css('display','none');
	})	
})