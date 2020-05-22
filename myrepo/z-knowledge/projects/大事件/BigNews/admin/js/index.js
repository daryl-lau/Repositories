$(function () {
    $.ajax({
        method: 'get',
        url: bigNew.user_info,
        dataType: 'json',
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
        // },
        success: function (data) {
            console.log(data);
            if (data.code == 200) {
                $('.user_info > span').text(`欢迎您，${data.data.nickname}`)
                $('.user_info > img').prop('src', data.data.userPic)
                $('.user_center_link > img').prop('src', data.data.userPic)
            }
        },
        // error: function (err) {
        //     if (err.status == 403) {
        //         location.href = './login.html'
        //     }
        // }
    })

    $('.level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')

        if ($(this).next().hasClass('level02')) {
            $(this).next().slideToggle();
            $(this).find('b').toggleClass('rotate0')
            $(this).next().children().eq(0).addClass('active').siblings().removeClass('active')
        }
    })

    $('.level02 > li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
})