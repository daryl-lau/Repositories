$(function () {
// 大量代码
// ######################################################################################################
// 1、全选功能
// 原理，当前全选发生改变时，我们要知道全选是否选择，如果选择，小按钮也要选择，否则不下安泽
	$('.checkall').change(function () {
		// 获取大按钮是否选中
		var flag = $(this).prop('checked');
		// 直接设置为flag
		$('.j-checkbox,.checkall').prop('checked',flag);

	});
// ####################################################################################################
// 2、小按钮全选
// 所有小按钮都选择，大按钮就选择，否则就不选择
	$('.j-checkbox').change(function () {
		// 我们只要知道总共有几个小按钮，再知道选择的小按钮有几个
		// 如果总个数和选择的个数相等，说明全选
		// len1总共有几个
		var len1 = $('.j-checkbox').length;
		// len2选择几个
		var len2 = $('.j-checkbox:checked').length;
		// 大按钮
		$('.checkall').prop('checked',len1 == len2);
		// 判断
		// if (len1 == len2) {
		// 	$('.checkall').prop('checked',true);
		// } else {
		// 	$('.checkall').prop('checked',false);
		// }
	});
// #####################################################################################################
// 3、点击增加
// 点击的获取值，让值加1，赋值回去
	$('.increment').click(function () {
		// 获取当前加号兄弟的value值
		var val = $(this).siblings('.itxt').val();
		// 增加1
		val++;
		// 赋值回去
		$(this).siblings('.itxt').val(val);

		// 小计 = 数量 * 单价
		// 获取单价
		var str = $(this).parent().parent().siblings('.p-price').html();
		// 截取
		str = str.substring(1);
		// 求小计
		var zhi = str * val;
		// 设置【n.toFixed(2)】
		$(this).parent().parent().siblings('.p-sum').html('￥' + zhi.toFixed(2));

	});
// ###########################################################################################
// 4、点击减少
	$('.decrement').click(function () {
		// 获取当前加号兄弟的value值
		var val = $(this).siblings('.itxt').val();
		if (val == 1) {
			// 如果为1，就不希望再减
			// return后面如果不写值，返回的是undefined，
			// 如果不写return，还会返回undefined
			// 不管写不写返回值，函数遇到return就会结束
			return;
		}
		// 减少1
		val--;
		// 赋值回去
		$(this).siblings('.itxt').val(val);

		// 小计 = 数量 * 单价
		// 获取单价
		var str = $(this).parent().parent().siblings('.p-price').html();
		// 截取
		str = str.substring(1);
		// 求小计
		var zhi = str * val;
		// 设置【n.toFixed(2)】
		$(this).parent().parent().siblings('.p-sum').html('￥' + zhi.toFixed(2));
	});








})