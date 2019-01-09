function getStyle(obj, name) {
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
    }
    else
    {
        return getComputedStyle(obj, null)[name];
    }
}

function startMove(obj, json, endFunc) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var bResult = true;

        for (var attr in json) {

            var cur = 0;

            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }

            var speed = (json[attr] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != json[attr]){
                bResult = false;
            }

            if (attr === 'opacity') {
                obj.style.filter='alpha(opacity:'+ (cur + speed) +')';
                obj.style.opacity = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
        }

        if (bResult){
            clearInterval(obj.timer);
            if(endFunc){endFunc()}
        }

    },30)
}