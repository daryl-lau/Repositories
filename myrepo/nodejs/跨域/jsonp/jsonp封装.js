(function (window) {
    function JSONP() {
    }

    /**
     *
     * @param option
     */
    JSONP.request = function (option) {
        var callbackName = 'getData_' + randomWord(false, 10);
        window[callbackName] = function (data) {
            option.success(data);
            document.body.removeChild(script);
        };
        if (isValid(option.url)) {
            option.url += '&callback=' + callbackName
        } else {
            option.url += '?callback=' + callbackName
        }
        var script = document.createElement('script');
        script.src = option.url;
        document.body.appendChild(script);
    };

    /**
     * 返回一个随机数
     * @param {boolean}randomFlag, min{number}, max{number}
     */
    function randomWord(randomFlag, min, max) {
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            var pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }


    // /**
    //  * 把对象转成字符串
    //  */
    // function getStrWithObject(paramObj) {
    //     var rArr = [];
    //     for (var key in paramObj) {
    //         var str = key + '=' + paramObj[key];
    //         rArr.push(str);
    //     }
    //     rArr.push('random=' + randomWord(false, 20));
    //     return rArr.join('&');
    // }

    function isValid(str) {
        return /\?/.test(str);
    }

    window.JSONP = JSONP;
})(window);