window.onload = function () {


    var btnBottom = document.querySelector('#btn_bottom');
    var wrapper = document.querySelector('#wrapper');
    var btnPrevNext = document.querySelector('#btn_prev_next');
    var btnPrev = document.querySelector('#btn_prev_next .btn-prev');
    var btnNext = document.querySelector('#btn_prev_next .btn-next');


    // 拼接前后图片，最后一张加到开头，第一张加到结尾
    let ul = document.querySelector('#main ul');
    let firstImg = ul.firstElementChild.cloneNode(true);
    let lastImg = ul.lastElementChild.cloneNode(true);
    ul.insertBefore(lastImg, ul.children[0]);
    ul.appendChild(firstImg);



    var allLis = document.querySelectorAll('#main ul li');
    var imgWidth = allLis[0].offsetWidth;
    ul.style.transform = 'translateX(' + -imgWidth + 'px)';

    // 如果样式中写了ul的宽度，这里可以不设置
    // ul.style.width = allLis.length * 100 + '%';

    // 前后两个不算在个数之内
    for (var i = 0; i < allLis.length - 2; i++) {

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

    let addTransition = (obj) => {
        obj.style.transaction = 'all .2s ease';
        obj.style.webkitTransition = 'all .2s ease';

    };
    let removeTransition = (obj) => {
        obj.style.transaction = '';
        obj.style.webkitTransition = '';
    };
    let changeTranslateX = (obj, x) => {
        obj.style.transform = `translateX(${x}px)`;
        obj.style.webkitTransform = `translateX(${x}px)`
    };

    // 这里很关键，设置相同的样式会层叠，导致transform设置只会取到最后的值，这里可以使用这种方法让其一步一步来执行
    let clearTransform = (obj) => {
        getComputedStyle(obj, null).transform;
    }

    var imgNow = 1;
    var btnNow;
    btnNext.onclick = function () {
        // 边界值判断
        if (imgNow >= allLis.length - 1) {  // 6
            removeTransition(ul);
            changeTranslateX(ul, -imgWidth)

            // 这里很关键，设置相同的样式会层叠，导致transform设置只会取到最后的值，这里可以使用这种方法让其一步一步来执行
            clearTransform(ul);

            imgNow = 1;
        }
        addTransition(ul);
        changeTranslateX(ul, -imgWidth * (imgNow + 1));

        // 按钮的边界值判断
        if (imgNow >= allLis.length - 2) {  // 5
            btnNow = 0;
        } else {
            btnNow = imgNow;
        }

        // 按钮样式排它设置
        for (var i = 0; i < allBtnLis.length; i++) {
            removeClass(allBtnLis[i], 'current');
        }
        addClass(allBtnLis[btnNow], 'current');

        imgNow++;
    };

    btnPrev.onclick = function () {
        if (imgNow <= 0) {
            removeTransition(ul);
            changeTranslateX(ul, -imgWidth * (allLis.length - 2))
            clearTransform(ul);
            imgNow = allLis.length - 2;
        }
        addTransition(ul);
        changeTranslateX(ul, -imgWidth * (imgNow - 1));

        if (imgNow <= 1) {
            btnNow = allBtnLis.length - 1;
        } else {
            btnNow = imgNow - 2;
        }

        for (var i = 0; i < allBtnLis.length; i++) {
            removeClass(allBtnLis[i], 'current');
        }
        addClass(allBtnLis[btnNow], 'current');

        imgNow--;
    };

    // 底部按钮点击跳转到相应位置
    for (let i = 0; i < allBtnLis.length; i++) {
        allBtnLis[i].onclick = function () {
            addTransition(ul);
            changeTranslateX(ul, -imgWidth * (i + 1));

            imgNow = i + 1;

            for (var j = 0; j < allBtnLis.length; j++) {
                removeClass(allBtnLis[j], 'current');
            }
            addClass(allBtnLis[i], 'current');


        }
    };

    // 定义定时器自动滚动
    var timer;
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(
            function () {
                btnNext.click()
            }, 2000)
    }
    startTimer()
};