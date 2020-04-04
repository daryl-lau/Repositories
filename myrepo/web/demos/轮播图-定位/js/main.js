window.onload = function () {

    var allLis = document.querySelectorAll('#main ul li');
    var btnBottom = document.querySelector('#btn_bottom');
    var wrapper = document.querySelector('#wrapper');
    var btnPrevNext = document.querySelector('#btn_prev_next');
    var btnPrev = document.querySelector('#btn_prev_next .btn-prev');
    var btnNext = document.querySelector('#btn_prev_next .btn-next');
    var imgWidth = allLis[0].offsetWidth;

    for (var i = 0; i < allLis.length; i++) {
        // 初始化，将第一张图left设置为0，其他的设置为imgWidth，所有图片都进行了定位，因此只会显示第一张图，其他图放到第一张图的右边
        if (i === 0) {
            allLis[i].style.left = 0;
        } else {
            allLis[i].style.left = imgWidth + 'px';
        }

        // 创建底部的按钮，有多少个li就有多少个按钮
        var li = document.createElement('li');
        btnBottom.appendChild(li);
    }


    // 设置初始底部按钮的位置和当前值
    var allBtnLis = document.querySelectorAll('#btn_bottom li');
    var btnBottomWidth = btnBottom.offsetWidth;
    addClass(allBtnLis[0], 'current');
    btnBottom.style.marginLeft = -btnBottomWidth / 2 + 'px';


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
        // 把当前图片移动到左边去
        uniformMove(allLis[imgNow], { 'left': -imgWidth }, 30);

        // 把当前图片设置为下一张图片
        imgNow++;

        // 边界值，如果当前图片已经是最后一张了，则把当前图片设置为第一张
        if (imgNow >= allLis.length) {
            imgNow = 0;
        }

        // 把移入的图片移动到可视区的右边去，然后再移入到可视区
        allLis[imgNow].style.left = imgWidth + 'px';
        uniformMove(allLis[imgNow], { 'left': 0 }, 30);

        // 底部按钮样式排他，
        for (var i = 0; i < allBtnLis.length; i++) {
            removeClass(allBtnLis[i], 'current');
        }
        addClass(allBtnLis[imgNow], 'current');
    };

    btnPrev.onclick = function () {
        uniformMove(allLis[imgNow], { 'left': imgWidth }, 30);
        imgNow--;
        if (imgNow < 0) {
            imgNow = allLis.length - 1;
        }

        allLis[imgNow].style.left = -imgWidth + 'px';
        uniformMove(allLis[imgNow], { 'left': 0 }, 30);


        for (var i = 0; i < allBtnLis.length; i++) {
            removeClass(allBtnLis[i], 'current');
        }
        addClass(allBtnLis[imgNow], 'current');
    };


    for (var i = 0; i < allBtnLis.length; i++) {
        (function (index) {
            allBtnLis[index].onclick = function () {
                for (var j = 0; j < allBtnLis.length; j++) {
                    removeClass(allBtnLis[j], 'current');
                }
                addClass(this, 'current');

                if (imgNow > index) {
                    uniformMove(allLis[imgNow], { 'left': imgWidth }, 30);
                    allLis[index].style.left = -imgWidth + 'px';
                    uniformMove(allLis[index], { 'left': 0 }, 30);
                } else if (imgNow < index) {
                    uniformMove(allLis[imgNow], { 'left': -imgWidth }, 30);
                    allLis[index].style.left = imgWidth + 'px';
                    uniformMove(allLis[index], { 'left': 0 }, 30);
                };

                imgNow = index;
            }
        }
        )(i);
    }
    var timer;
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(
            function () {
                btnNext.click()
            }, 1000)
    }
    startTimer()
};