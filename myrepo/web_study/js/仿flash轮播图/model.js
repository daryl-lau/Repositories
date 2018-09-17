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
        if (attr == 'opacity') {
            cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        }
        else {
            cur = parseInt(getStyle(obj, attr));
        }

        var speed = (iTarget - cur) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (cur == iTarget) {
            clearInterval(obj.timer)
        }
        else {
            if (attr == 'opacity') {
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
    var aLi_bottom = oDiv_bottom.getElementsByTagName('li');
    var aLi_top = oDiv_top.getElementsByTagName('li');


    leftBtn.onmouseover = leftBtnArea.onmouseover = function () {
        startMove(leftBtn, 'opacity', 100)
    };
    leftBtn.onmouseout = leftBtnArea.onmouseout = function () {
        startMove(leftBtn, 'opacity', 0)
    };

    rightBtn.onmouseover = rightBtnArea.onmouseover = function () {
        startMove(rightBtn, 'opacity', 100)
    };
    rightBtn.onmouseout = rightBtnArea.onmouseout = function () {
        startMove(rightBtn, 'opacity', 0)
    };

    var nowIndex = 2;
    var now = 0;

    for (var i = 0; i < aLi_bottom.length; i++){

        aLi_bottom[i].index = i;
    
        aLi_bottom[i].onclick = function () {
            if (this.index == now) {}
            else {
                now = this.index;
                aLi_top[this.index].style.zIndex = nowIndex++;
                aLi_top[this.index].style.height = 0;
                startMove(aLi_top[this.index], 'height', 320);
    
                for (var i = 0; i < aLi_bottom.length; i++) {
                    startMove(aLi_bottom[i], 'opacity', 30)
                }
                startMove(this, 'opacity', 100);
            }
        };
    
        aLi_bottom[i].onmouseover = function () {
            startMove(this, 'opacity', 100);
        };
    
        aLi_bottom[i].onmouseout = function () {
            if (this.index != now ){
                startMove(this, 'opacity', 30);
            }
        }
    }
    
    rightBtn.onclick = function () {
        now++;
        aLi_top[now].style.zIndex = nowIndex++;
        aLi_top[now].style.height = 0;
        startMove(aLi_top[now], 'height', 320);

        for (var i = 0; i < aLi_bottom.length; i++) {
            startMove(aLi_bottom[i], 'opacity', 30)
        }
        // startMove(aLi_top[now], 'opacity', 100);

    }
};