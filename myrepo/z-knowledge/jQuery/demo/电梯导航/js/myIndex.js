$(function () {
    show();
    function show() {
        if ($(document.scrollingElement).scrollTop() >= $('.recommend').offset().top) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    };


    $(window).scroll(function () {
        show();
        let top = $(document.scrollingElement).scrollTop();
        $('.floor>div').each(function (index, curEle) {
            if (top >= $(curEle).offset().top) {
                $('.fixedtool li').eq(index).addClass('current').siblings().removeClass('current');
            }
        })
    });

    $('.fixedtool li').click(function () {
        $('html,body').stop().animate({ scrollTop: $('.floor>div').eq($(this).index()).offset().top });
    })

    $('.back-top').click(function () {
        $('html,body').stop().animate({ scrollTop: 0 });
    })
})