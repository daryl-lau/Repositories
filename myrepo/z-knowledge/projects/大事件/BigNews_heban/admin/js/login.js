$(function(){
    // 登陆
    // 1、用户登录
    // 请求地址：/admin/user/login
    // 请求方式：post

    $('.input_sub').on('click',function(e){
        // e.preventDefault() // 阻止按钮的默认行为。sibmit有默认的提交行为
        var username = $('.input_txt').val().trim();
        var password = $('.input_pass').val().trim();
        //4.非空判断
        if (username == '' || password == '') {
        //   alert('用户名与密码不能为空');
            $('#myModal').modal('show')
            $('.logininfo').text('用户名与密码不能为空')
          return;
        }
        // 任何请求之后，一定要查阅接口文档
        $.ajax({
            type:'post',
            // url:'http://localhost:8080/api/v1/admin/user/login',
            url:BigNew.user_login,
            // ajax支持的 参数类型常见的有：key=value&key=value   {key:value}   formdata
            // 属性名称一定要参照后台接口
            data:{
                username,
                password
            },
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code == 200){
                    // 先弹出模态框
                    $('#myModal').modal('show')
                    $('.logininfo').text(res.msg)
                    // 跳转只有在模态框消失之后再跳转
                    // hidden.bs.modal	此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 存储一定要在跳转之前存储
                        localStorage.setItem('heban_bignews_token',res.token)
                        location.href='./index.html'
                    })
                }else{
                    $('#myModal').modal('show')
                    $('.logininfo').text(res.msg)
                }
            }
        })
    })

    // 单击模态框中的确定让模态框消失
    $('.btnconfirm').on('click',function(){
        $('#myModal').modal('hide')
    })
})