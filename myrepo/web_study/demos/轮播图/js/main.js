window.onload = function () {

    var allLis = document.querySelectorAll('#main ul li');
    var btnBottom = document.querySelector('#btn_bottom');
    var wrapper = document.querySelector('#wrapper');
    var btnPrevNext = document.querySelector('#btn_prev_next');
    var btnPrev = document.querySelector('#btn_prev_next .btn-prev');
    var btnNext = document.querySelector('#btn_prev_next .btn-next');
    var imgWidth = allLis[0].offsetWidth;

    for (var i = 0; i < allLis.length; i++){
        if (i === 0){
            allLis[i].style.left = 0;
        }else {
            allLis[i].style.left = imgWidth + 'px';
        }

        var li = document.createElement('li');
        btnBottom.appendChild(li);
    }


    var allBtnLis = document.querySelectorAll('#btn_bottom li');
    var btnBottomWidth = btnBottom.offsetWidth;
    addClass(allBtnLis[0], 'current');
    btnBottom.style.marginLeft = -btnBottomWidth/2 + 'px';

    wrapper.onmouseover = function () {
        btnPrevNext.style.display = 'block';
        clearInterval(timer);
    };
    wrapper.onmouseout = function () {
        btnPrevNext.style.display = 'none';
        startTimer();
    };

    btnPrev.onmouseover = function () {
        addClass(this, 'hover')
    };
    btnPrev.onmouseout = function () {
        removeClass(this, 'hover')
    };
    btnNext.onmouseover = function () {
        addClass(this, 'hover')
    };
    btnNext.onmouseout = function () {
        removeClass(this, 'hover')
    };

    var imgNow = 0;
    btnNext.onclick = function () {
        uniformMove(allLis[imgNow], {'left': -imgWidth}, 30);
        imgNow++;
        if (imgNow >= allLis.length){
            imgNow = 0;
        }

        for (var i = 0; i < allBtnLis.length; i++){
            removeClass(allBtnLis[i], 'current')
        }
        addClass(allBtnLis[imgNow], 'current');

        allLis[imgNow].style.left = imgWidth + 'px';
        uniformMove(allLis[imgNow],{'left': 0},30)
    };

    btnPrev.onclick = function () {
        uniformMove(allLis[imgNow], {'left': imgWidth}, 30);
        imgNow--;
        if (imgNow < 0){
            imgNow = allLis.length -1;
        }
        for (var i = 0; i < allBtnLis.length; i++){
            removeClass(allBtnLis[i], 'current')
        }
        addClass(allBtnLis[imgNow], 'current');
        allLis[imgNow].style.left = -imgWidth + 'px';
        uniformMove(allLis[imgNow],{'left': 0},30)
    };

    for (var i = 0; i < allBtnLis.length; i++){
        (function (index) {
             allBtnLis[index].onclick = function () {
                 for (var j = 0; j < allBtnLis.length; j++){
                    removeClass(allBtnLis[j], 'current')
                 }
                 addClass(this, 'current');
                 if (imgNow > index){
                    uniformMove(allLis[imgNow], {'left': imgWidth}, 30);
                    allLis[index].style.left = -imgWidth + 'px';
                    uniformMove(allLis[index], {'left': 0}, 30)
                 }else if (imgNow < index){
                     uniformMove(allLis[imgNow], {'left': -imgWidth}, 30);
                     allLis[index].style.left = imgWidth + 'px';
                     uniformMove(allLis[index], {'left': 0}, 30)
                 }
                 imgNow = index;
             }
            }
        )(i);
    }
    timer = null;
    function startTimer(){
        clearInterval(timer);
        timer = setInterval(
            function () {
                btnNext.click()
            },1000)
    }
    startTimer()
};