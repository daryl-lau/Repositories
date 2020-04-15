$(function () {
	// 大量代码
// ########################################################################
// 1、全选功能
// 实现：当大按钮发生改变了，我们就设置小的按钮
// 小按钮设置选择不选择的情况，根据大按钮选择不选择的情况，
// 所以我们要先知道大按钮是否选择
	$('.checkall').change(function () {
		// 获取大按钮是否选择
		var flag = $(this).prop('checked');
		// 设置小按钮
		$('.j-checkbox,.checkall').prop('checked', flag);

		// 全选
		if (flag) {
			$('.cart-item').addClass('check-cart-item');
		} else {
			$('.cart-item').removeClass('check-cart-item');
		}
		// $('.checkall').prop('checked', flag);
		// if (flag) {
		// 	// 小按钮选择
		// } else {
		// 	// 小按钮
		// }
	});
// ################################################################
// 2、小按钮全选
// 小按钮一旦发生改变，就会影响大按钮选择不选择
	$('.j-checkbox').change(function () {
		// 把大按钮设置为选择，或者设置为不选择
		// 根据个数：选中小按钮的个数，总共小按钮有几个
		// 如果两个个数相同就是全部选择，大按钮就要选择
		// 否则，不要让大按钮选择
		// 小按钮个数
		var len1 = $('.j-checkbox').length;
		// 选中的小按钮的个数
		var len2 = $('.j-checkbox:checked').length;
		// 设置大按钮
		$('.checkall').prop('checked', len1 == len2);

		// 判断
		if ( $(this).prop('checked') ) {
			$(this).parents('.cart-item').addClass('check-cart-item');
		} else {
			$(this).parents('.cart-item').removeClass('check-cart-item');
		}
		// if (len1 == len2) {
		// 	$('.checkall').prop('checked', true);
		// } else {
		// 	$('.checkall').prop('checked', false);
		// }
	});
// ######################################################################
// 3、点击数量增加
// 点击获取value值，让value值加1，设置回去
	$('.increment').click(function () {
		// 获取value
		var val = $(this).siblings('.itxt').val();
		// 加1
		val++;
		// 设置回去
		$(this).siblings('.itxt').val(val);

		// 计算小计
		// 小计 = 单价 * 数量;
		// 获取单价
		var str = $(this).parent().parent().siblings('.p-price').html();
		// 截取字符
		str = str.substring(1);
		// 计算
		var zhi = val * str;
		// 放到页面上【zhi.toFixed(2)】
		$(this).parent().parent().siblings('.p-sum').html('￥' + zhi.toFixed(2));
		getSum();
	});
// ###########################################################################
// 4、点击数量减少
// 点击获取value值，让value值减1，设置回去
	$('.decrement').click(function () {
		// 获取value
		var val = $(this).siblings('.itxt').val();
		// 判断
		if (val == 1) {
			return;
		}
		// 减1
		val--;
		// 设置回去
		$(this).siblings('.itxt').val(val);

		// 计算小计
		// 小计 = 单价 * 数量;
		// 获取单价
		var str = $(this).parent().parent().siblings('.p-price').html();
		// 截取字符
		str = str.substring(1);
		// 计算
		var zhi = val * str;
		// 放到页面上【zhi.toFixed(2)】
		$(this).parent().parent().siblings('.p-sum').html('￥' + zhi.toFixed(2));
		getSum();
	});
// #######################################################################
// 5、输入数量
	$('.itxt').change(function () {
		// 获取value值
		var val = $(this).val();

		// 计算小计
		// 小计 = 单价 * 数量;
		// 获取单价
		var str = $(this).parent().parent().siblings('.p-price').html();
		// 截取字符
		str = str.substring(1);
		// 计算
		var zhi = val * str;
		// 放到页面上【zhi.toFixed(2)】
		$(this).parent().parent().siblings('.p-sum').html('￥' + zhi.toFixed(2));
		getSum();
	});
// #######################################################################
// 6、总件数和总价格
	getSum();
	function getSum () {
		// 总件数和总价格
		var count = 0;
		// 遍历
		$('.itxt').each(function (i, obj) {
			// 获取内容
			var n = $(obj).val();
			// 转换数据类型
			n = parseInt(n);
			// 相加
			count = count + n;
		});
		// 放到页面上
		$('.amount-sum em').html(count);
		// 总价格
		var sum = 0;
		// 遍历
		$('.p-sum').each(function (i, elm) {
			// 获取内容
			var m = $(elm).html();
			// 截取字符串
			m = m.substring(1);
			// 转换数据类型
			m = parseFloat(m);
			// 相加
			sum = sum + m;
		});
		// 放到页面上
		$('.price-sum em').html('￥' + sum.toFixed(2));
	}
// ###########################################################
// 7、删除功能
	$('.p-action a').click(function () {
		// 删谁?
		$(this).parents('.cart-item').remove();
		getSum();
	});

	$('.remove-batch').click(function () {
		$('.j-checkbox:checked').parents('.cart-item').remove();
		getSum();
	});

	$('.clear-all').click(function () {
		$('.cart-item').remove();
		getSum();
	});


});