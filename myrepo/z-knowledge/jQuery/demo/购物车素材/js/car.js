$(function () {
	// 大量代码
// 1、全选功能
// 当大按钮发生改变，小按钮跟着改变
// 小按钮是否选中，是根据大按钮选不选中而决定，必须要知道大按钮是否选中
	$('.checkall').change(function () {
		// 要想改变小按钮，我们得知道大按钮是否选中
		var flag = $(this).prop('checked');
		// 如果flag为true说明大按钮选中，否则就是不选中
		$('.j-checkbox,.checkall').prop('checked',flag);

		// flag：就是大按钮是否选中
		if (flag) {
			$('.cart-item').addClass('check-cart-item');
		} else {
			$('.cart-item').removeClass('check-cart-item');
		}

		// $('.checkall').prop('checked',flag);
		// if (flag == true) {
		// 	$('.j-checkbox').prop('checked',true);
		// } else {
		// 	$('.j-checkbox').prop('checked',false);
		// }

	});
// 2、小按钮全选
// 当小按钮发生改变，判断大按钮是否要选中
	$('.j-checkbox').change(function () {
		// 小按钮的个数如果和选中的小按钮的个数相同，那么一定是全选了
		// 小按钮的个数
		var len1 = $('.j-checkbox').length;
		// 小按钮选中的个数
		// :checked获取被选中的元素
		var len2 = $('.j-checkbox:checked').length;
		// 直接把len1==len2得到结果设置过去既可以
		$('.checkall').prop('checked',len1 == len2);

		// 我们得知道当前这个小按钮是否被选中
		// var re = $(this).prop('checked');
		if ($(this).prop('checked')) {
			$(this).parents('.cart-item').addClass('check-cart-item');
		} else {
			$(this).parents('.cart-item').removeClass('check-cart-item');
		}

		// 判断
		// if (len1 == len2) {
		// 	$('.checkall').prop('checked',true);
		// } else {
		// 	$('.checkall').prop('checked',false);
		// }
		// 大按钮选中
		// if (小按钮都选中) {
		// 	大按钮选中
		// } else {
		// 	大按钮不选中
		// }
	});

// 3、点击数量增加
// 点击的时候，获取文本框里面的内容，让内容加1，再设置回去
	$('.increment').click(function () {
		// 获取元素内容
		var n = $(this).siblings('.itxt').val();
		// 增加1
		n++;
		// 设置回去
		$(this).siblings('.itxt').val(n);

		// 计算小计
		// 小计 = 单价 * 数量
		// 小计 = 单价 * n
		// 获取单价：注意一定要从当前触发找到单价，不能找别的地方的单价
		var zhi = $(this).parent().parent().siblings('.p-price').html();
		// 截取字符串
		zhi = zhi.substring(1);
		// 计算
		var p = zhi * n;
		// console.log(p);
		// 放到页面上
		// p.toFixed(2)
		$(this).parent().parent().siblings('.p-sum').html('￥' + p.toFixed(2));

		// 调用总和函数
		getSum();

	});

// 4、点击数量减少
// 点击的时候，获取文本框里面的内容，让内容减1，再设置回去
	$('.decrement').click(function () {
		// 获取元素内容
		var n = $(this).siblings('.itxt').val();
		// 判断
		// 如果n为1的时候，就别减少了
		if (n == 1) {
			return;
		}
		// 减少1
		n--;
		// 设置回去
		$(this).siblings('.itxt').val(n);

		// 计算小计
		// 小计 = 单价 * 数量
		// 小计 = 单价 * n
		// 获取单价：注意一定要从当前触发找到单价，不能找别的地方的单价
		var zhi = $(this).parent().parent().siblings('.p-price').html();
		// 截取字符串
		zhi = zhi.substring(1);
		// 计算
		var p = zhi * n;
		// console.log(p);
		// 放到页面上
		// p.toFixed(2)
		$(this).parent().parent().siblings('.p-sum').html('￥' + p.toFixed(2));

		getSum();
	})
// 5、输入内容，计算小计
// 获取数量，获取单价，数量 *单价 = 小计，放到页面上
	$('.itxt').change(function () {
		// 获取数量
		var n = $(this).val();
		// 计算小计
		// 小计 = 单价 * 数量
		// 小计 = 单价 * n
		// 获取单价：注意一定要从当前触发找到单价，不能找别的地方的单价
		var zhi = $(this).parent().parent().siblings('.p-price').html();
		// 截取字符串
		zhi = zhi.substring(1);
		// 计算
		var p = zhi * n;
		// console.log(p);
		// 放到页面上
		// p.toFixed(2)
		$(this).parent().parent().siblings('.p-sum').html('￥' + p.toFixed(2));
		getSum();
	});
// 6、总件数和总价格
// 因为要求总件数和总价格的地方多，所以我们建议封装成为一个函数
	// 用来求总和，什么地方要求总和和总价格，就直接调用这个函数既可以
	getSum();
	function getSum () {
		// 求总件数
		var count = 0;
		// 遍历itxt
		$('.itxt').each(function (i, elm) {
			// 获取内容
			var val = $(elm).val();
			// 相加
			count = count + parseInt(val);
		});
		// 求和总件数后，把总数放到页面上
		$('.amount-sum em').html(count);

		// 求总价格
		var sum = 0;
		// 遍历
		$('.p-sum').each(function (i, elm) {
			// 获取内容
			var pSum = $(elm).html();
			// 截取字符串
			pSum = pSum.substring(1);
			// 求和
			sum = sum + parseFloat(pSum);
		});
		// 把结果放到页面上
		$('.price-sum em').html('￥' + sum.toFixed(2));

	}
// 7、删除功能
	// 点击删除删除当前商品
	$('.p-action a').click(function () {
		$(this).parents('.cart-item').remove();

		getSum();
	});

	// 删除选中的商品
	$('.remove-batch').click(function () {
		$('.j-checkbox:checked').parents('.cart-item').remove();

		getSum();
	});

	// 清空购物车
	$('.clear-all').click(function () {
		$('.cart-item').remove();

		getSum();
	});

});