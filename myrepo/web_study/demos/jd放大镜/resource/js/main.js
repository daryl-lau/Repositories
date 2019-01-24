window.onload = function () {


    var prevBtn = document.querySelector('#prev');
    var nextBtn = document.querySelector('#next');

    var lis = document.querySelectorAll('.view_s_box li');
    var ul = document.querySelector('.view_s_box ul');

    if (lis.length > 5){
        prevBtn.onclick = function () {
            startMove(ul, {'left':0});
            removeClass(this, 'hover');
            addClass(this, 'disabled');
        };

        nextBtn.onclick = function () {
            startMove(ul, {'left':-228});
            addClass(this, 'disabled');
            removeClass(this, 'hover')
        };

        prevBtn.onmouseover = function () {
            if (parseInt(ul.offsetLeft) === 0){
                addClass(this, 'disabled');
            }else {
                addClass(this, 'hover')
            }
        };

        nextBtn.onmouseover = function () {
            if (parseInt(ul.offsetLeft) === -228){
                addClass(this, 'disabled');
            }else {
                addClass(this, 'hover')
            }
        };

        prevBtn.onmouseout = function(){
            removeClass(prevBtn, 'hover')
        };

        nextBtn.onmouseout = function(){
            removeClass(nextBtn, 'hover')
        };

    }else {
        addClass(prevBtn, 'disabled');
        addClass(nextBtn, 'disabled');
    }



};