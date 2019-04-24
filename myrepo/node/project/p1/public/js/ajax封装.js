(function (window) {
    function ajax() {}

    ajax.ajaxRequest = function (url, paramObj, successCallback, errCallback) {
        // 1、创建XMLHttpRequest对象
        var xhr;
        var timer;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // console.log(account, password);
        // 2、准备发送
        /*
            参数1：请求方式（get/post）
            参数2：请求url
            参数3：是否异步
         */
        xhr.open('get', url + '?' + getStrWithObject(paramObj), true);

        // 3、发送请求，常用于post请求
        xhr.send();

        // 4、监听服务器响应，一旦服务器响应回来之后，就会执行这个函数
        xhr.onreadystatechange = function () {
            // 5、处理响应数据
            if (xhr.readyState === 4) {  //代表服务器已经给了响应，不代表响应成功
                if (xhr.status === 200) {
                    successCallback(xhr);
                    // 清除请求定时器
                    clearTimeout(timer);
                }else {
                    errCallback();
                }
            }
        };

        // 设置请求超时时间
        timer = setTimeout(function () {
            xhr.abort();
        },5000)
    };

    function getRandomStr() {
        return Math.random() + (new Date().getTime())
    }

    function getStrWithObject(paramObj) {
        var rArr = [];
        for (var key in paramObj){
            var str = key + '=' + paramObj[key];
            rArr.push(str);
        }
        rArr.push('random=' + getRandomStr());
        return rArr.join('&')
    }

    window.ajax = ajax;
})(window);