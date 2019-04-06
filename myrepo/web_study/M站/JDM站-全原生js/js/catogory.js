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


    function getStyle(obj, name) {
        if (obj.currentStyle) //IE
        {
            return obj.currentStyle[name];
        }
        else {
            return getComputedStyle(obj, null)[name];  //FF
        }
    }

    let parent = document.querySelector('.content');
    let ul = document.querySelector('.left ul');
    let ulLength = ul.offsetHeight;
    let parentHeight = parent.offsetHeight - parseInt(getStyle(parent, 'paddingTop')) - parseInt(getStyle(parent, 'paddingBottom'));


    // css3动画函数
    let addTransition = (obj) => {
        obj.style.transaction = 'all .2s ease';
        obj.style.webkitTransition = 'all .2s ease';

    };
    let removeTransition = (obj) => {
        obj.style.transaction = '';
        obj.style.webkitTransition = '';
    };
    let changeTranslateY = (obj, y) => {
        obj.style.transform = `translateY(${y}px)`;
        obj.style.webkitTransform = `translateY(${y}px)`
    };


    // 拖动效果
    let topLength = 150,    //拖动留白的高度
        startY = 0,
        endY = 0,
        distanceY = 0,
        currentY = 0,
        lastTime = 0,
        timeDis = 0,
        speed = 0,
        translateY = 0;

    ul.addEventListener('touchstart', (e) => {

        // 阻止冒泡
        e.stopPropagation();

        // 获取鼠标按下时的y值
        startY = e.touches[0].clientY;

        // 获取鼠标按下是的时间
        lastTime = Date.now();
    });

    ul.addEventListener('touchmove', (e) => {

        // 阻止冒泡
        e.stopPropagation();

        // 获取鼠标移动过程中的y值
        endY = e.touches[0].clientY;

        // 计算鼠标走过的距离，鼠标上滑，此值为正，鼠标下滑，此值为负；
        distanceY = startY - endY;

        // 计算出需要滚动的距离，currentY初始为0，后续移动会在之前的基础上进行移动，鼠标上滑，translateY值变小，鼠标下滑，translateY值变大；
        translateY = currentY - distanceY;

        // 执行滚动
        removeTransition(ul);
        changeTranslateY(ul, translateY);

        // 边界值处理
        if (translateY > topLength) {
            changeTranslateY(ul, topLength);
        } else if (translateY < -(ulLength + topLength - parentHeight)) {
            changeTranslateY(ul, -(ulLength + topLength - parentHeight));
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
            speed = parseInt(distanceY / timeDis * 150);   // 150为惯性系数，此值越大，惯性效果越大
        }

        // 计算出需要滚动的距离，减去惯性速度，之所以是减，是因为惯性速度的符号由distanceY决定，注意方向的正负
        translateY -= speed;

        // 边界值处理
        if (translateY > 0) {
            translateY = 0;
            currentY = 0;
        } else if ((-(ulLength - parentHeight)) < translateY && translateY < 0) {
            currentY = translateY;
        } else if (translateY < -(ulLength - parentHeight)) {
            translateY = -(ulLength - parentHeight);
            currentY = -(ulLength - parentHeight);
        }
        addTransition(ul);
        changeTranslateY(ul, translateY);

        //还原值
        endY = 0;
        distanceY = 0;
    });


    let lis = ul.getElementsByTagName('li');
    ul.tap(function (e) {

        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
            lis[i].index = i;
        }
        e.target.className = 'current';


        translateY = -(e.target.index - 7) * 40;

        if (translateY <= -(ulLength - parentHeight)) {
            translateY = -(ulLength - parentHeight)
        }else if (translateY >= 0){
            translateY = 0
        }
        currentY = translateY;

        addTransition(ul);
        changeTranslateY(ul, translateY);

    });









    // var newli = document.createElement('li');
    // newli.innerText = '3333333';
    //
    // ul.append(newli)

};

