window.onload = function () {


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
    let topLength = 150,
        startY = 0,
        endY = 0,
        distanceY = 0,
        currentY = 0,
        lastTime = 0,
        timeDis = 0,
        speed = 0,
        translateY = 0;

    ul.addEventListener('touchstart', (e) => {

        //阻止冒泡
        e.stopPropagation();

        //获取鼠标按下时的y值
        startY = e.touches[0].clientY;

        //获取鼠标按下是的时间
        lastTime = Date.now();
    });
    ul.addEventListener('touchmove', (e) => {

        //阻止冒泡
        e.stopPropagation();

        //获取鼠标移动过程中的y值
        endY = e.touches[0].clientY;

        //计算鼠标走过的距离，鼠标上滑，此值为正，鼠标下滑，此值为负；
        distanceY = startY - endY;

        //计算出需要
        translateY = currentY - distanceY;

        removeTransition(ul);
        changeTranslateY(ul, translateY);

        if (translateY > topLength) {
            changeTranslateY(ul, topLength);
        } else if (translateY < -(ulLength + topLength - parentHeight)) {
            changeTranslateY(ul, -(ulLength + topLength - parentHeight));
        }

    });
    ul.addEventListener('touchend', (e) => {
        e.stopPropagation();


        timeDis = Date.now() - lastTime;

        if (timeDis > 300) {
            speed = 0;
        } else {
            speed = parseInt(distanceY / timeDis * 150);
        }

        translateY -= speed;

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
};

