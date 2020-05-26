$(function () {

    let currentPage;
    queryUsers()

    $.ajax({
        method: 'get',
        url: bigNew.catagory_list,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.code == 200) {
                let res = template('selCategoryTemp', data);
                $('#selCategory').append(res)
            }
        }
    })

    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        queryUsers();
    })


    $('tbody').on('click', '.delete', function () {
        console.log($(this).data('id'));
        let id = $(this).data('id')
        if ($('tbody').find('tr').length == 1) {
            currentPage--
        }
        console.log(currentPage);
        $.ajax({
            method: 'post',
            url: bigNew.article_delete,
            data: { id },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                queryUsers(currentPage)
            }
        })
    })


    function queryUsers(page) {
        let p = page || 1;
        $.ajax({
            method: 'get',
            url: bigNew.article_query,
            // data: $('form').serialize() + `&page=${p}&pageSize=10`,
            data: {
                page: p,
                perpage: 15,
                type: $('#selCategory').val(),
                state: $('#selStatus').val()
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                let temp = template('tbody', data.data)
                $('tbody').html(temp)

                // 分页插件
                $("#myPage").sPage({
                    page: p,//当前页码，必填
                    total: data.data.totalCount,//数据总条数，必填
                    pageSize: 15,//每页显示多少条数据，默认10条
                    showTotal: true,//是否显示总条数，默认关闭：false
                    totalTxt: `共${data.data.totalCount}条`,//数据总条数文字描述，{total}为占位符，默认"共{total}条"
                    noData: false,//没有数据时是否显示分页，默认false不显示，true显示第一页
                    showSkip: true,//是否显示跳页，默认关闭：false
                    showPN: true,//是否显示上下翻页，默认开启：true
                    prevPage: "上一页",//上翻页文字描述，默认“上一页”
                    nextPage: "下一页",//下翻页文字描述，默认“下一页”
                    fastForward: 5,//快进快退页数，默认0表示不开启快进快退
                    backFun: function (page) {
                        //点击分页按钮回调函数，返回当前页码
                        queryUsers(page)
                        currentPage = page
                    }
                });
            }
        })
    }
})