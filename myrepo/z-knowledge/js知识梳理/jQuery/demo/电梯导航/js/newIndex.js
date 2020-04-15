$(function () {
	showDiv();
	function showDiv () {
		// 页面滚动出去一段距离，让电梯导航显示
		// 获取卷起距离
		var topVal = $(document).scrollTop();
		
		// 判断
		if (topVal >= $('.recommend').offset().top) {
			// 让盒子显示
			$('.fixedtool').fadeIn();
		} else {
			$('.fixedtool').fadeOut();
		}
	}

	// 添加滚动事件，加给window
	$(window).scroll(function () {
		
		showDiv();


		// 滚动的过程中，如果 到大某个div就要让对应的li显示效果
		// 知道当前这个盒子的索引值，如果索引值找到li
		// 卷起距离和每一个盒子到顶部距离比较，如果超过顶部的距离，说明到大这个盒子，
		// 此时就得让对应的li显示样式
		var top = $(document).scrollTop();
		$('.floor>div').each(function (i, elm) {

			// 让top和每个盒子顶部比较
			if (top >= $(elm).offset().top) {
				$('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
			}

		});

	});


	// 点击电梯导航，页面到指定的位置
	$('.fixedtool li').click(function () {
		console.log( $(this) );
		// 我们得知道要到哪个盒子，
		// 求出这个盒子距离文档顶部的位置
		// 把scrollTop设置成这个位置，那么这个效果就实现
		// 1、点击li要知道这个li的索引值
		var index = $(this).index();
		// 2、找到对应的div及到顶部的位置
		var topZhi = $('.floor>div').eq(index).offset().top;
		// 3、修改卷起距离
		// $(document).scrollTop(topZhi);
		// 动画要加给元素
		$('body,html').animate({
			scrollTop : topZhi
		},function () {
			$(this).addClass('current').siblings().removeClass('current');
			console.log( $(this) );
		});

		

	});


});