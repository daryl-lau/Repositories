$(function () {

    $('.monitor .marquee').each(function (index, elm) {
        let copy = $(elm).children().clone();
        $(elm).append(copy);
    })

    $('.monitor a').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.monitor .content').eq($(this).data('index')).css('display', 'block').siblings('.content').css('display', 'none');
    });

})