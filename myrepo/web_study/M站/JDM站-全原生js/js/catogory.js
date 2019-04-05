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
    let parentLength = parent.offsetHeight - parseInt(getStyle(parent, 'paddingTop')) - parseInt(getStyle(parent, 'paddingBottom'));


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
    let topLength = 150;
    let startY = 0;
    let endY = 0;
    let distanceY = 0;
    let currentY = 0;
    ul.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    ul.addEventListener('touchmove', (e) => {
        endY = e.touches[0].clientY;
        distanceY = startY - endY;

        removeTransition(ul);
        changeTranslateY(ul, currentY - distanceY);

        if (currentY - distanceY > topLength) {
            changeTranslateY(ul, topLength);
        } else if (currentY - distanceY < -(ulLength + topLength - parentLength)) {
            changeTranslateY(ul, -(ulLength + topLength - parentLength));
        }


    });
    ul.addEventListener('touchend', (e) => {
        if (currentY - distanceY > 0) {
            addTransition(ul);
            changeTranslateY(ul, 0);
            currentY = 0;
        } else if ( (-(ulLength - parentLength)) < (currentY - distanceY) &&  (currentY - distanceY) < 0) {
            currentY = currentY - distanceY;
        } else if (currentY - distanceY < -(ulLength - parentLength)){
            addTransition(ul);
            changeTranslateY(ul, -(ulLength - parentLength));
            currentY = -(ulLength - parentLength);
        }


        // currentY = currentY - distanceY;

        // // distanceY = 0;
        // startY = 0;
        // endY = 0;

        //     addTransition(ul);
        //     changeTranslateX(ul, -index * liWidth);
        //     changeIndex();
        //     timer = setInterval(autoPlay, 5000);
        //     startY = 0;
        //     endY = 0;
        //     distanceY = 0;
    });
};

