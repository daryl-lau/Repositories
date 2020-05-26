$(function () {
    init();
    $('.modal-confirm').on('click', function () {
        let name = $('#name').val()
        let slug = $('#slug').val()
        console.log(name, slug);
        $.ajax({
            method: 'post',
            url: bigNew.catagory_add,
            data: { name, slug },
            dataType: 'json',
            success: function (data) {
                if (data.code == 201) {
                    $('#myModal').modal('hide')
                    $('form')[0].reset()
                    init()
                }
            },
            error: function (err) {
                console.log(err);
                if (err.status == 400) {
                    alert(err.responseJSON.msg)
                }
            }
        })
    })

    $('tbody').on('click', '.btn-del', function () {
        let that = this
        $('#confirmModal').modal('show')
        $('.modal-delete-confirm').on('click', function () {
            let id = $(that).parent().parent().data('cata_id');
            $.ajax({
                method: 'post',
                url: bigNew.catagory_delete,
                data: { id },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 204) {
                        $('#confirmModal').modal('hide')
                        init()
                    }
                }
            })
        })
    })

    $('tbody').on('click', '.btn-edit', function () {
        $('#edit-name').val($(this).parent().parent().data('name'))
        $('#edit-slug').val($(this).parent().parent().data('slug'))
        $('#edit-name').prop('data-id', $(this).parent().parent().data('cata_id'))
        $('#editModal').modal('show');
    })

    $('.edit-modal-confirm').on('click', function () {
        let name = $('#edit-name').val()
        let slug = $('#edit-slug').val()
        let id = $('#edit-name').prop('data-id')
        console.log(id, name, slug);
        $.ajax({
            method: 'post',
            url: bigNew.catagory_edit,
            data: { id, name, slug },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.code == 200) {
                    $('#editModal').modal('hide')
                    $('form')[0].reset()
                    init()
                } else if (data.code == 400) {
                    alert(data.msg)
                    $('#editModal').modal('hide')
                }
            },
        })
    })

    function init() {
        $.ajax({
            method: 'get',
            url: bigNew.catagory_list,
            dataType: 'json',
            success: function (data) {
                let res = template('tbody', data);
                $('tbody').html(res)
            }
        })
    }
})