$(function(){
    // 2、获取用户信息
    // 请求地址：/admin/user/info
    // 请求方式：get
    // 请求参数：无

    // 页面一加载，就请求用户信息
    $.ajax({
        url:BigNew.user_info,
        dataType:'json',
        // 通过请求头的方式传递token数据，并且键只能使用Authorization
        // headers:
        // 请求发送前来设置请求头，这个函数有一个默认参数xhr,它就是那个异步对象
        // xhr.setrequestHeader('Content-type','application...')
        // beforeSend:function(xhr){
        //     xhr.setRequestHeader('Authorization',localStorage.getItem('heban_bignews_token'))
        // },
        // 请求成功的回调函数
        success:function(res){
            console.log(res)
            if(res.code == 200){
                $('.user_info > img').attr('src',res.data.userPic)
                $('.user_info > span').html('欢迎你&nbsp;&nbsp;'+res.data.nickname)
            }
        },
        // 使用error专门处理请求失败的场景：token无效的时候的请求是请求失败，不是成功，它不会触发success
        // error:function(err){
        //     console.log(err)
        //     if(err.statusText == 'Forbidden'){ // Forbidden说明token已过期
        //         alert('请求失败，请重新登陆')
        //         location.href='./login.html'
        //     }
        // }
    })

    // 实现左侧菜单项的样式切换和展开
    $('.level01').on('click',function(){
        // 切换样式
        $(this).addClass('active').siblings().removeClass('active')
        // 实现 文章管理菜单项的展开和合并--只有单击了文章管理才需要进行展开和合并 
        // 我怎么知道你单击的是文章管理呢？我的下一个兄弟元素是level02
        // hasClass:判断是否包含某个样式
        if($(this).next().hasClass('level02')){ // 一定要仔细的分析页面结构
            // 展开下一个元素  slideToggle：垂直方向的展开和合并
            // slideDown:展开
            $(this).next().slideToggle()
            // 同时让右侧的小箭头旋转切换--切换样式  rotate0:箭头需要旋转90度
            // toggleClass：切换样式，如果有就移除，如果没有就添加
            // rotate0：存在于我们自定义的样式表中
            $(this).find('b').toggleClass('rotate0')
        }else { // 单击的为是文章管理，而是其它菜单项：合并文章管理菜单项，同时让箭头旋转回去
            // 让level02合并  slideUp:合并
            $('.level02').slideUp()
            // 让箭头旋转回去
            $('.level01').find('b').removeClass('rotate0')
            // 清除子项可能添加的active
            $('.level02 > li').removeClass('active')
        }
    })


    // 单击子项菜单 ，切换样式
    $('.level02 > li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
})