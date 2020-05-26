$(function(){
    // 1.数据初始化
    // 10、文章搜索
    // 请求地址：/admin/article/query
    // 请求方式：get

    // 定义几个变量
    let page = 1, // 当前页码
    perpage = 8 // 每页显示的数量
    function init(){
        $.ajax({
            url:BigNew.article_query,
            data:{
                page,
                perpage,
                // 添加文章分类参数
                type: $('#selCategory').val(),
                // 添加文章状态参数
                state: $('#selStatus').val()
            },
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    // 渲染文章列表
                    $('tbody').html(template('articleTemp',res.data))
                    if(res.data.totalPage > 1){
                        // 渲染分页结构  totalPage:直接返回了总页数
                        setPage(res.data.totalPage)
                    }else{
                        setPage(1)
                    }
                }
            }
        })
    }
    init()

    // 实现分页功能
    // pageSum:总页数
    function setPage( pageSum) {
        //  $(".pagination").bootstrapPaginator:调用bootstrapPaginator生成分页结构，并放置到$(".pagination")元素中
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 当前页码
            currentPage: page,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event,originalEvent,type,cpage) {
                // init()
                // cpage就是我们当前所单击的页码值，意味着我们只需要按照这个页码值进行ajax请求，就能够获取到当前页的数据
                console.log(cpage)
                if(page != cpage){
                    page = cpage
                    // 根据新的页码值重新发起请求
                    init()
                }
            }
        })
    }


    // 动态加载文章分类数据
    $.ajax({
        url: BigNew.category_list,
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                // 模板中使用的是我们所传递的数据对象的属性名称
                $('#selCategory').html(template('cateTemp', res))
            }
        }
    })


    // 实现文章数据的筛选
    $('#btnSearch').on('click',function(e){
        e.preventDefault()
        // let type = $('#selCategory').val()
        // let state = $('#selStatus').val()
        // console.log(type,state)
        // 筛选之后，我们应该将页码重置为1
        page = 1
        // 调用ajax根据搜索条件发起数据请求
        init()
    })

    // 实现文章的删除
    // 14、删除文章
    // 请求地址：/admin/article/delete
    // 请求方式：post
    $('tbody').on('click','.btndelete',function(e){
        e.preventDefault()
        let id = $(this).data('id')
        $.ajax({
            type:'post',
            url:BigNew.article_delete,
            data:{id},
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 204){
                    alert(res.msg)
                    // 删除和刷新是两个不同的操作
                    // 代码到了这一步，删除已经完成了
                    if($('tbody').find('tr').length == 1){
                        if(page > 1){ // 说明现在不是第一页，才有得减
                            page --
                        }
                    }
                    init()
                }
            }
        })
    })

    $('#release_btn').click(function(){
        //$() :第一个参数：选择器  第二个参数：document，默认是当前窗口document
      $('.level02>li:eq(1)',window.parent.document).addClass('active')
      .siblings()
      .removeClass('active');
    });

})