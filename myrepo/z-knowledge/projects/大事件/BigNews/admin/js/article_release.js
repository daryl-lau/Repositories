$(function () {
    $('#inputCover').on('change', function () {
        let cover = $(this)[0].files[0]
        let coverUrl = URL.createObjectURL(cover)
        $('.article_cover').attr('src', coverUrl)
    })

    $.ajax({
        method: 'get',
        url: bigNew.catagory_list,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                let res = template('categoryList', data)
                $('select[name=categoryId]').html(res)
            }
        }
    })

    // jeDate("#indate", {
    //     format: "YYYY-MM-DD",
    //     isTime: false,
    //     minDate: "2014-09-19 00:00:00",
    //     trigger: "click",
    //     isinitVal: true,
    // })

    // tinymce.init({
    //     selector: '#mytextarea',
    //     branding: false,
    //     plugins: "code",
    // });
    initJedate();
    initTinymce();

    $('.btn-release').on('click', function (e) {
        e.preventDefault()
        publish('已发布')
    })

    $('.btn-draft').on('click', function (e) {
        e.preventDefault()
        publish('草稿')
    })

    function publish(state) {
        let formData = new FormData($('#form')[0])
        formData.append('content', tinymce.activeEditor.getContent())
        formData.append('state', state)
        $.ajax({
            method: 'post',
            url: bigNew.article_publish,
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.code == 200) {
                    alert('发布成功')
                    location.href = './article_list.html'
                } else {
                    alert('发布失败')
                }
            },
            error: function () {
                alert('发布失败')
            }
        })
    }
})