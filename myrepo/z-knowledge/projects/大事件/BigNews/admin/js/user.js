$(function () {
    $.ajax({
        method: 'get',
        url: bigNew.user_detail,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.code == 200) {
                $('input[name=username]').val(data.data.username)
                $('input[name=nickname]').val(data.data.nickname)
                $('input[name=email]').val(data.data.email)
                $('input[name=password]').val(data.data.password)
                $('.user_pic').prop('src', data.data.userPic)
            }
        }
    })
    $('#exampleInputFile').on('change', function () {
        let img = $(this)[0].files[0];
        let url = URL.createObjectURL(img);
        $('.user_pic').prop('src', url)
    })

    $('.btn-edit').on('click', function () {
        let formdata = new FormData($('#form')[0])
        $.ajax({
            method: 'post',
            url: bigNew.user_edit,
            data: formdata,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    $('.modal-body p').text(data.msg)
                    $('#myModal').modal('show')
                }
            }
        })
    })
    $('.modal-confirm').on('click', function () {
        $('#myModal').modal('hide')
    })

    $('#myModal').on('hidden.bs.modal', function (e) {
        // location.reload();
        window.parent.location.reload()
    })
})