$(function () {
    // 1.实现文件预览：一选择文件就实现文件预览
    $('#inputCover').on('change', function () {
        // 1.获取文件对象
        let myfile = this.files[0]
        // 2.生成url
        let url = URL.createObjectURL(myfile)
        // 3.赋值给img标签的src属性
        $('.article_cover').attr('src', url)
    })

    // 2.实现分类数据的动态渲染
    $.ajax({
        url: BigNew.category_list,
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                // 模板中使用的是我们所传递的数据对象的属性名称
                $('.category').html(template('cateTemp', res))
            }
        }
    })

    // 3.日期插件初始化
    jeDate('#artcileDate', {
        trigger: 'click',
        // bgcolor:背景色   pnColor：本月和下月及上月的分隔色
        theme: { bgcolor: "orange", pnColor: "blue" },//red色主题
        format: "YYYY-MM-DD",
        isinitVal: true,
    })

    // 初始化富文本框
    tinymce.init({
        selector: '#articlecontent',
        height:'350px',
        language: 'zh_CN',
        branding:false,// 清除询问的标识
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste imagetools wordcount",
            "code"
        ]
    });

    // 发表文章和存储为草稿
    function publish(state){
        let formdata = new FormData($('#form')[0])
        // 单独的追加文章内容
        formdata.append('content',tinymce.activeEditor.getContent())
        // 添加文章类型：已发布|草稿
        formdata.append('state',state)
        $.ajax({
            type:'post',
            url:BigNew.article_publish,
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
    // 11、发布文章
    // 请求地址：/admin/article/publish
    // 请求方式：post

    $('.btn-release').on('click', function (e) {
        e.preventDefault()
        // activeEditor:当前的富文本框
        // getContent():可以获取当前文本框的内容
        // console.log(tinymce.activeEditor.getContent())
        // FormData:传入的表单必须是dom元素
        publish('已发布')
    })

    // 存储为草稿
    $('.btn-draft').on('click',function(e){
        e.preventDefault()
        publish('草稿')
    })

})