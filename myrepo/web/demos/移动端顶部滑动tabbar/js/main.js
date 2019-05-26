window.onload = function () {


    // tap移动端点击事件封装
    HTMLElement.prototype.tap = HTMLElement.prototype.tap || function (callBack) {
        var tapStart = 0,
            tapEnd = 0,
            tapTime = 300;
        this.addEventListener("touchstart", function (e) {
            //获取touchstart事件的时间戳
            tapStart = e.timeStamp;

            //changedTouchs是事件对象TouchEvent上面的属性,上面存储了一个当前操作的信息。
            let point = e.changedTouches[0];
            this.strX = point.pageX;
            this.strY = point.pageY;
            this.isMove = false;
        }, false);


        // 由于有些设备对于点击移动很敏感，所以需要判断该移动是否被视为点击
        this.addEventListener("touchmove", function (e) {
            let point = e.changedTouches[0];
            let changeX = point.pageX - this.strX;
            let changeY = point.pageY - this.strY;
            if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
                this.isMove = true;
            }
        }, false);

        this.addEventListener("touchend", function (e) {
            //获取touchend事件的时间戳
            tapEnd = e.timeStamp;
            tapTime = tapEnd - tapStart;
            if (!this.isMove && tapTime <= 150) {
                callBack(e);
            }
        }, false);
    };

    let tabbar = document.querySelector('#tabbar');
    let ul = document.querySelector('#tabbar ul');
    let ulWidth = ul.offsetWidth;
    let liWidth = ul.getElementsByTagName('li')[0].offsetWidth;
    let tabbarWidth = tabbar.offsetWidth;
    let span = ul.getElementsByTagName('span')[0];

    // css3动画函数
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


    let whiteLength = 100, //拖动留白的宽度
        startX = 0,
        endX = 0,
        distanceX = 0,
        currentX = 0,
        lastTime = 0,
        timeDis = 0,
        speed = 0,
        translateX = 0,
        spanTranslateX = 0;

    ul.addEventListener('touchstart', (e) => {

        // 阻止冒泡
        e.stopPropagation();

        // 获取鼠标按下时的y值
        startX = e.touches[0].clientX;

        // 获取鼠标按下时的时间
        lastTime = Date.now();
    });

    ul.addEventListener('touchmove', (e) => {

        // 阻止冒泡
        e.stopPropagation();

        // 获取鼠标移动过程中的y值
        endX = e.touches[0].clientX;

        // 计算鼠标走过的距离，鼠标上滑，此值为正，鼠标下滑，此值为负；
        distanceX = startX - endX;

        // 计算出需要滚动的距离，currentY初始为0，后续移动会在之前的基础上进行移动，鼠标上滑，translateY值变小，鼠标下滑，translateY值变大；
        translateX = currentX - distanceX;

        // 执行滚动
        if (ulWidth >= tabbarWidth) {
            removeTransition(ul);
            changeTranslateX(ul, translateX);

            // 边界值处理
            if (translateX > whiteLength) {
                changeTranslateX(ul, whiteLength);
            } else if (translateX < -(ulWidth + whiteLength - tabbarWidth)) {
                changeTranslateX(ul, -(ulWidth + whiteLength - tabbarWidth));
            }
        }

    });

    ul.addEventListener('touchend', (e) => {

        e.stopPropagation();

        // 惯性原理:
        //    产生的速度 = 移动距离 / 移动时间
        //    距离 = 松开的坐标 - 上次的坐标  (距离差)
        //    时间 = 松开的时间 - 按下的时间  (时间差)


        // 计算鼠标拖拽的时间
        timeDis = Date.now() - lastTime;

        // 拖拽时间大于300毫秒，惯性速度为0，否则计算；
        if (timeDis > 300) {
            speed = 0;
        } else {
            // 计算惯性速度
            speed = parseInt(distanceX / timeDis * 150); // 150为惯性系数，此值越大，惯性效果越大
        }

        // 计算出需要滚动的距离，减去惯性速度，之所以是减，是因为惯性速度的符号由distanceY决定，注意方向的正负
        translateX -= speed;

        // 边界值处理
        if (translateX > 0) {
            translateX = 0;
            currentX = 0;
        } else if ((-(ulWidth - tabbarWidth)) < translateX && translateX < 0) {
            currentX = translateX;
        } else if (translateX < -(ulWidth - tabbarWidth)) {
            translateX = -(ulWidth - tabbarWidth);
            currentX = -(ulWidth - tabbarWidth);
        }
        if (ulWidth >= tabbarWidth) {
            addTransition(ul);
            changeTranslateX(ul, translateX);

            //还原值
            endX = 0;
            distanceX = 0;
        }
    });

    let lis = ul.getElementsByTagName('li');
    ul.tap(function (e) {

        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
            lis[i].index = i;
        }
        e.target.className = 'current';

        translateX = -(e.target.index * liWidth - (tabbarWidth - liWidth) / 2);

        if (translateX <= -(ulWidth - tabbarWidth)) {
            translateX = -(ulWidth - tabbarWidth)
        } else if (translateX >= 0) {
            translateX = 0
        }
        currentX = translateX;

        spanTranslateX = e.target.index * liWidth;

        if (ulWidth >= tabbarWidth) {
            addTransition(ul);
            changeTranslateX(ul, translateX);
        }

        addTransition(span);
        changeTranslateX(span, spanTranslateX);

    });
};