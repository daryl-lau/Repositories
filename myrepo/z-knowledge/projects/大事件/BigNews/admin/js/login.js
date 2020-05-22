$(function () {
    $('.input_sub').on('click', function () {
        let username = $('.input_txt').val().trim();
        let password = $('.input_pass').val().trim();

        $.ajax({
            method: 'post',
            url: bigNew.user_login,
            data: { username, password },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    localStorage.setItem('token', data.token)
                    location.href = './index.html'
                } else {
                    $('.modal-body p').text(data.msg)
                    $('#myModal').modal('show')
                }
            }
        })

        $('.modal-confirm').on('click', function () {
            $('#myModal').modal('hide')
        })
    })
})