$(function(){
    // 1.获取id
    // search获取当前请求url中?及后面的内容
    // split的方式只能处理单个参数的情况
    // let id = location.search.split('=')[1]
    let id = itcast.getArguments(location.search).id
    
    // 根据id获取文件详情数据
    // 12、根据id获取文章信息
    // 请求地址：/admin/article/search
    // 请求方式：get
    $.ajax({
        url:BigNew.article_search,
        data:{id},
        dataType:'json',
        success:function(res){
            console.log(res)
            if(res.code == 200){
                $('#inputTitle').val(res.data.title)
                $('.article_cover').attr('src',res.data.cover)
                // 下拉列表：下拉列表赋值的值的两种方式
                // 1.赋值字符串--不常见
                // 2.赋值value值，它会找到与value值匹配的选项进行显示
                $(".category").val(res.data.categoryId)
                $('#artcileDate').val(res.data.date)
                // 富文本框
                $('#articlecontent').val(res.data.content)
            }
        }
    })

    // 实现图片预览
    $('#inputCover').change(function(){
        let file = this.files[0]
        let url = URL.createObjectURL(file)
        $('.article_cover').attr('src',url)
    })

    // 13、文章编辑
    // 请求地址：/admin/article/edit
    // 请求方式：post
    // 封装编辑和存为草稿方法
    // state:当前的操作类型：发表|存为草稿
    function opt(state){
        // 使用formdata收集数据
        let formdata = new FormData($('form')[0]) // title,cover,categoryId,data
        // 文本内容
        formdata.append('content',tinymce.activeEditor.getContent())
        // 添加id条件
        formdata.append('id',id)
        // 状态
        formdata.append('state',state)
        $.ajax({
            type:'post',
            url:BigNew.article_edit,
            data:formdata,
            dataType:'json',
            processData:false,
            contentType:false,
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    alert(res.msg)
                    location.href='./article_list.html'
                }
            }
        })
    }
    // 实现编辑
    $('.btn-edit').on('click',function(e){
        e.preventDefault()
        opt('已发布')
    })
    // 存为草稿
    $('.btn-draft').on('click',function(e){
        e.preventDefault()
        opt('草稿')
    })
})