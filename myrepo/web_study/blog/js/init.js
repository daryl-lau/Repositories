//根据浏览器窗口的大小，来动态的设置主体内容的长度
//1190px,990px
function setWrap(){
    if ($(window).width()>1260) {
        //1190px
        $('body').attr('class','w1260');
    }else{
        //990px
        $('body').attr('class','w1190');
    }
}
setWrap();
$(window).on('resize',setWrap);