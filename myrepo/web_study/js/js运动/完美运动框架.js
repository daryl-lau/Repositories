/**
 * get style
 * ex: getStyle(box, 'width').
 * @param {node}obj
 * @param {string}name
 * @returns {string}
 */
function getStyle(obj, name) {
    if(obj.currentStyle) //IE
    {
        return obj.currentStyle[name];
    }
    else
    {
        return getComputedStyle(obj, null)[name];  //FF
    }
}


/**
 * used to set style animate.
 * ex: startMove(this, {'width':100, 'height':100}, function (){ alert('Move ended') }).
 * @param {node}obj
 * @param {styleMedia}json
 * @param {function}endFunc
 */
function startMove(obj, json, endFunc) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var bResult = true;

        for (var attr in json) {

            var cur;

            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }

            var speed = (json[attr] - cur) / 6;

            //get the initeger
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != json[attr]){
                bResult = false;
            }

            if (attr === 'opacity') {
                obj.style.filter='alpha(opacity:'+ (cur + speed) +')';  //IE
                obj.style.opacity = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
        }

        //execute the end function
        if (bResult){
            clearInterval(obj.timer);
            if(endFunc){endFunc()}
        }
    },30)
}