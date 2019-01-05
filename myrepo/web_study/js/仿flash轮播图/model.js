function getStyle(objc, name) {
    if(objc.currentStyle)
    {
        return objc.currentStyle[name];
    }
    else
    {
        return getComputedStyle(objc, null)[name];
    }
}

function startMove(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur = 0;
        if (attr === 'opacity') {
            cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        }
        else {
            cur = parseInt(getStyle(obj, attr));
        }

        var speed = (iTarget - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (cur === iTarget) {
            clearInterval(obj.timer)
        }
        else {
            if (attr === 'opacity') {
                obj.style[attr] = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }

        }
    }, 30)
}




window.onload = function () {

    var oDiv_top = document.getElementsByClassName('top')[0];


    var leftBtnArea = oDiv_top.getElementsByClassName('left_btn_area')[0];
    var leftBtn = oDiv_top.getElementsByClassName('left_btn')[0];
    var rightBtnArea = oDiv_top.getElementsByClassName('right_btn_area')[0];
    var rightBtn = oDiv_top.getElementsByClassName('right_btn')[0];

    var oDiv_bottom = document.getElementsByClassName('bottom')[0];
    var oUl_bottom = oDiv_bottom.getElementsByTagName('ul')[0];
    var aLi_bottom = oDiv_bottom.getElementsByTagName('li');
    var aLi_top = oDiv_top.getElementsByTagName('li');
    var msg = document.getElementsByClassName('msg')[0];
    var desc = msg.getElementsByClassName('left')[0];
    var num = msg.getElementsByClassName('right')[0];



    function move_left() {
        var padding_value = parseInt(getComputedStyle(aLi_bottom[0], null).paddingRight);
        // console.log(padding_value);
        if (now === 0){
            startMove(oUl_bottom, 'left', padding_value)
        }
        else if (now === 1)
        {
            startMove(oUl_bottom, 'left', padding_value)
        }
        else if (now === 2)
        {
            startMove(oUl_bottom, 'left', padding_value)
        }
        else if (now === 9)
        {
            startMove(oUl_bottom, 'left', -((now -3) * aLi_bottom[0].offsetWidth - padding_value))
        }
        else {
            startMove(oUl_bottom, 'left', -((now -2) * aLi_bottom[0].offsetWidth - padding_value))
        }
    }

    leftBtn.onmouseover = leftBtnArea.onmouseover = function () {
        clearInterval(timer);
        startMove(leftBtn, 'opacity', 100)
    };

    leftBtn.onmouseout = leftBtnArea.onmouseout = function () {
        startTimer();
        startMove(leftBtn, 'opacity', 0)
    };

    rightBtn.onmouseover = rightBtnArea.onmouseover = function () {
        clearInterval(timer);
        startMove(rightBtn, 'opacity', 100)
    };
    rightBtn.onmouseout = rightBtnArea.onmouseout = function () {
        startTimer();
        startMove(rightBtn, 'opacity', 0)
    };

    var nowIndex = 2;
    var now = 0;

    for (var i = 0; i < aLi_bottom.length; i++){
        aLi_bottom[i].index = i;
        aLi_bottom[i].onclick = function () {
        if (this.index === now) return;
        now = this.index;

        num.innerText =  now + 1 + '/10';

        for (var i = 0; i < aLi_bottom.length; i++){
            aLi_bottom[i].style.opacity = 0.3;
        }
        aLi_bottom[this.index].style.opacity = 1;

        aLi_top[this.index].style.zIndex = nowIndex++;
        aLi_top[this.index].style.height = 0;
        startMove(aLi_top[this.index], 'height', 320);

        move_left()

        };

        aLi_bottom[i].onmouseover = function () {
            clearInterval(timer);
            startMove(aLi_bottom[this.index], 'opacity', 100)
        };
        aLi_bottom[i].onmouseout = function () {
            startTimer();
            if (this.index === now){
                aLi_bottom[this.index].style.opacity = 1;
            }
            else {
                startMove(aLi_bottom[this.index], 'opacity', 30)
            }
        };
    }

    function tab(){
        aLi_top[now].style.zIndex = nowIndex++;
        aLi_top[now].style.height = 0;
        startMove(aLi_top[now], 'height', 320);

        for (var i = 0; i < aLi_bottom.length; i++){
            aLi_bottom[i].style.opacity = 0.3;
        }
        aLi_bottom[now].style.opacity = 1;
        num.innerText =  now + 1 + '/10';
        move_left()
    }

    rightBtn.onclick = function () {
        now++;
        if (now === aLi_top.length){
            now = 0
        }
        tab()
    };

    leftBtn.onclick = function () {
        now--;
        if (now === -1){
            now = aLi_top.length -1;
        }
        tab()
    };

    timer = null;
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(function () {
            now++;
            if (now === aLi_top.length) {
                now = 0
            }
            tab()
        }, 5000)
    }
    startTimer()

};