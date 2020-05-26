$(function () {

    initJedate()
    initTinymce()

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

    let { id } = praseUrl(location.search)
    $.ajax({
        method: 'get',
        url: bigNew.article_search,
        data: { id },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.code == 200) {
                $('#inputTitle').val(data.data.title)
                $('.article_cover').attr('src', data.data.cover)
                $('.category').val(data.data.categoryId)
                $('#indate').val(data.data.date)
                $('#mytextarea').val(data.data.content)
            }
        }
    })

    $('#inputCover').on('change', function () {
        let cover = $(this)[0].files[0]
        let coverUrl = URL.createObjectURL(cover)
        $('.article_cover').attr('src', coverUrl)
    })


    $('.btn-edit').on('click', function (e) {
        e.preventDefault()
        let formData = new FormData($('#form')[0])
        formData.append('content', tinymce.activeEditor.getContent())
        formData.append('state', '已发布')
        formData.append('id', id)
        $.ajax({
            method: 'post',
            url: bigNew.article_edit,
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.code == 200) {
                    alert('修改成功')
                    location.href = './article_list.html'
                } else {
                    alert('修改失败')
                }
            },
            error: function () {
                alert('修改失败')
            }
        })
    })


})