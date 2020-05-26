$(function(){
    // 3、获取用户详情
    // 请求地址：/admin/user/detail
    // 请求方式：get

    // 页面加载，立刻发起ajax请求获取用户详情
    $.ajax({
        url:BigNew.user_detail,
        dataType:'json',
        success:function(res){
            console.log(res)
            // 操作dom
            $('[name="username"]').val(res.data.username)
            $('[name="nickname"]').val(res.data.nickname)
            $('[name="email"]').val(res.data.email)
            $('[name="password"]').val(res.data.password)
            // 图片
            $('.user_pic').attr('src',res.data.userPic)
        }
    })


    // 一选择好文件就实现文件预览
    // 只是实现预览，并没有实现文件的上传
    $('#exampleInputFile').on('change',function(){
        // 1.获取当前的所选择的文件对象
        let myfile = this.files[0]
        // 2.根据文件对象生成一个url,它会将这个文件托管到当前页面服务器中，并返回一个服务器中的路径
        let url = URL.createObjectURL(myfile)
        // 3.将url赋值给img的src属性
        $('.user_pic').attr('src',url)
    })

    // 实现个人信息的编辑
    // 4、编辑用户信息
    // 请求地址：/admin/user/edit
    // 请求方式：post
    // 请求数据：使用formData提交

    $('.btn-edit').on('click',function(){
        $.ajax({
            type:'post',
            url:BigNew.user_edit,
            data:new FormData($('#form')[0]),//formdata能不能收集图片数据？能
            dataType:'json',
            processData:false, // 不用ajax来进行数据的处理
            contentType:false, // 不让ajax来进行数据的编码处理
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    alert(res.msg)
                    // 刷新上级页面
                    window.parent.location.reload()
                }
            }
        })
    })
})