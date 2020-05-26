$(function(){
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
})

let itcast = {
    // 动态的添加项目中需要的功能函数
    getArguments:function(str){ //?id=2&name=jack 》》 {id:2,name:"jack"}
        let obj = {}
        // 1.去除？
        str = str.substring(1) // id=2&name=jack
        // 2.将str以&符合进行分隔
        let arr = str.split('&') // ["id=2","name=jack"]
        // 3.循环，并以=做为分隔符对数组中的元素再次分隔，将分隔的结构一个做为键，一个做为值
        for(let i=0;i<arr.length;i++){
            // 第一次：id=2
            let temp = arr[i].split('=') // ["id",2]
            // 生成对象
            obj[temp[0]] = temp[1] // {id:2}
        }
        return obj // {id:1,name:"jack"}
    }
}