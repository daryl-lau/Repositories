(function (window) {
    function AJAX() {
    }

    AJAX.ajaxRequest = function (params, successCallBack, errorCallBack) {
        // 0. 获取参数
        var requestType = params['requestType'] || 'get';
        var url = params['url'];
        var paramObj = params['paramObj'];
        var timeout = params['timeout'];

        // 1.创建XMLHttpRequest对象 (找到一个电话)
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // 2. 判断请求方式
        if (requestType.toLowerCase() === 'get') {
            var codeURI = encodeURI(url + '?' + getStrWithObject(paramObj));
            xhr.open('get', codeURI, true);
            xhr.send();
        } else if (requestType.toLowerCase() === 'post') {
            // 请求体
            var codeParam = encodeURI(getStrWithObject(paramObj));
            xhr.open('post', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-from-urlencoded');
            xhr.send(codeParam);
        }

        // 3. 监听服务器的响应 (等待电话拨通)
        xhr.onreadystatechange = function () {
            // 4. 处理响应的数据 (对方说话)
            if (xhr.readyState === 4) {
                // 代表服务器已经给了响应, 不代表响应成功
                if (xhr.status === 200) {
                    successCallBack(xhr);
                    // 清除请求定时器
                    clearTimeout(timer);
                } else {
                    errorCallBack();
                }
            }
        };

        // 5. 控制请求的时间
        var timer;
        if (timeout > 0) {
            timer = setTimeout(function () {
                // 取消ajax请求
                xhr.abort();
            }, timeout);
        }
    };

    /**
     * 返回一个随机数
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
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }

    /**
     * 把对象转成字符串
     */
    function getStrWithObject(paramObj) {
        var rArr = [];
        for (var key in paramObj) {
            var str = key + '=' + paramObj[key];
            rArr.push(str);
        }
        rArr.push('random=' + randomWord(false, 20));
        return rArr.join('&');
    }

    window.AJAX = AJAX;
})(window);