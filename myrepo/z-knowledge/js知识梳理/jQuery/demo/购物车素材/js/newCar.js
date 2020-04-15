$(function () {
	// 写大量代码
// ##########################################################################
// 1、全选功能
// 大全选框发生改变的时候，小复选框也得跟着改变
// 大按钮如果选中，小按钮也得选中，大如果不选中，小的也不选择
	$('.checkall').change(function () {
		// 获取大按钮是否选中【获取checked】
		var flag = $(this).prop('checked');// flag保存的是当前大按钮是否被选中
		// 简单
		$('.j-checkbox,.checkall').prop('checked', flag);

		// 判断
		// if (flag) {
		// 	$('.j-checkbox').prop('checked', true);
		// } else {
		// 	$('.j-checkbox').prop('checked', false);
		// }
	});
// ########################################################################
// 2、小按钮全选
// 发现：任何一个小的按钮发生改变，大按钮都有可能选中或者不选中
	$('.j-checkbox').change(function () {
		// 换思路
		// 如果小按钮总个数和被选中的小按钮的个数相同，那么就说明全选了
		// 所以我们只要知道小按钮的总数和被选中的小按钮的总数，如果相同就全选
		// 我们需要知道小按钮的总个数
		var len1 = $('.j-checkbox').length;
		// 还需要知道被选中的小按钮的总个数
		var len2 = $('.j-checkbox:checked').length;
		// 根据长度判断设置大按钮
		$('.checkall').prop('checked', len1 == len2);

		

		// 判断
		// if (len1 == len2) {
		// 	$('.checkall').prop('checked', true);
		// } else {
		// 	$('.checkall').prop('checked', false);
		// }
		

		// 判断三个小按钮
		// if (三个小按钮都选中) {
		// 	大的就得选中
		// } else {
		// 	大的就要不选中
		// }
	});
// #############################################################################
// 3、点击商品数量增加
	$('.increment').click(function () {
		// 点击让当前的数量增加
		// 1、获取当前input的value值
		var val = $(this).siblings('.itxt').val();
		// 2、让value增加1
		val++;
		// 3、设置回去
		$(this).siblings('.itxt').val( val );
	});
// ###################################################################################
//  4、点击商品数量减少
	$('.decrement').click(function () {
		// 点击让当前的数量减少
		// 1、获取当前input的value值
		var val = $(this).siblings('.itxt').val();
		// 判断
		if (val == 1) {
			// 不想让val继续执行--
			return;
		}
		// 2、让value减少1
		val--;
		// 3、设置回去
		$(this).siblings('.itxt').val( val );
	});


});