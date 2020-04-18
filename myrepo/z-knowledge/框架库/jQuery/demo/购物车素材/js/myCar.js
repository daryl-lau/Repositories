$(function () {

    // 全部选中
    $('.checkall').change(function () {
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        // $('.amount-sum').find('em').text($('.j-checkbox:checked').length);
        if ($(this).prop('checked') == true) {
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        };
        getTotalPrice();
    })

    // 子项选中和全部选中联动
    $('.j-checkbox').change(function () {
        // 方法一，假设思想，先假设全部选中，再逐个判断是否未选中，如果未选中，则将全部选中取消
        // $('.checkall').prop('checked', true);
        // $('.j-checkbox').each(function () {
        //     if ($(this).prop('checked') != true) {
        //         $('.checkall').prop('checked', false);
        //     }
        // })

        // 方法二，判断选中的个数和总的个数是否相等，如果相等则设置全部选中为选中状态，否则不设置
        $('.checkall').prop('checked', $('.j-checkbox').length == $('.j-checkbox:checked').length)

        // 计算选中个数
        // $('.amount-sum').find('em').text($('.j-checkbox:checked').length)

        // $('.j-checkbox:checked').parent().parent().addClass('check-cart-item');
        if ($(this).prop('checked') == true) {
            $(this).parent().parent().addClass('check-cart-item');
        } else {
            $(this).parent().parent().removeClass('check-cart-item');
        };
        getTotalPrice();
    })

    // 增加商品
    $('.increment').click(function () {
        let count = $(this).prev().val();
        let price = $(this).parent().parent().prev().text().slice(1);
        count++;
        $(this).prev().val(count);
        let totalPrice = Math.ceil(count * price * 100) / 100;
        $(this).parent().parent().next().text('￥' + totalPrice.toFixed(2));
        getTotalPrice();
    });

    // 减少商品
    $('.decrement').click(function () {
        let count = $(this).next().val();
        let price = $(this).parent().parent().prev().text().slice(1);
        count--;
        if (count < 1) {
            return;
        }
        $(this).next().val(count);
        let totalPrice = Math.ceil(count * price * 100) / 100;
        $(this).parent().parent().next().text('￥' + totalPrice.toFixed(2));
        getTotalPrice();
    });

    // 商品数量限制键盘输入，只能输入数字回退和delete
    $('.itxt').keydown(function (e) {
        e = window.event || e;
        let k = e.keyCode;
        if (((k == 8) || (k == 46) || (k <= 57 && k >= 48)) && (k != 102)) {
            return true;
        } else {
            return false
        }
    })

    // 用户输入商品数量处理
    $('.itxt').keyup(function () {
        let price = $(this).parent().parent().prev().text().slice(1);
        let count = $(this).val();
        if (count == 0) {
            count = 1;
            $(this).val(1)
        }
        let totalPrice = Math.ceil(count * price * 100) / 100;
        $(this).parent().parent().next().text('￥' + totalPrice.toFixed(2));
        getTotalPrice();
    })

    // 删除商品
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove();
        console.log($('.j-checkbox').length);
        checkAll();
        getTotalPrice()
    });

    // 删除选中商品
    $('.remove-batch').click(function () {
        $('.j-checkbox:checked').parent().parent().remove()
        checkAll();
        getTotalPrice();
    })

    // 清理购物车
    $('.clear-all').click(function () {
        $('.cart-item-list').children().remove();
        checkAll();
        getTotalPrice();
    })

    function getTotalPrice() {
        let allCount = 0;
        $('.j-checkbox:checked').parent().siblings('.p-num').find('.itxt').each(function () {
            allCount += +$(this).val();
        })

        let allPrice = 0;
        $('.j-checkbox:checked').parent().siblings('.p-sum').each(function () {
            allPrice += +$(this).text().slice(1)
        })

        $('.amount-sum em').text(allCount);
        $('.price-sum em').text(allPrice.toFixed(2));
    };

    function checkAll() {
        if ($('.j-checkbox').length == 0) {
            $('.checkall').prop('checked', false)
        } else {
            $('.checkall').prop('checked', $('.j-checkbox').length == $('.j-checkbox:checked').length);
        }
    }
    getTotalPrice();
})  