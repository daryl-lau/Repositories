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
    var aLi = oDiv_bottom.getElementsByTagName('li');
    alert(aLi.length)

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

    for (var i = 0; i < aLi.length; i++){
        aLi[i].onclick = function () {
        }
    }
};