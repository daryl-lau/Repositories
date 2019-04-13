// tap移动端点击事件封装
HTMLElement.prototype.tap = HTMLElement.prototype.tap || function (callBack) {
    var tapStart = 0,
        tapEnd = 0,
        tapTime = 300;
    this.addEventListener("touchstart", function (e) {
        //获取touchstart事件的时间戳
        tapStart = e.timeStamp;

        console.log(e);

        //changedTouchs是事件对象TouchEvent上面的属性,上面存储了一个当前操作的信息。
        let point = e.changedTouches[0];
        this.strX = point.pageX;
        this.strY = point.pageY;
        this.isMove = false;
    }, false);


    // 由于有些设备对于点击移动很敏感，所以需要判断该移动是否被视为点击
    this.addEventListener("touchmove", function (e) {
        let point = e.changedTouches[0];
        let changeX = point.pageX - this.strX;
        let changeY = point.pageY - this.strY;
        if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            this.isMove = true;
        }
    }, false);

    this.addEventListener("touchend", function (e) {
        //获取touchend事件的时间戳
        tapEnd = e.timeStamp;
        tapTime = tapEnd - tapStart;
        if (!this.isMove && tapTime <= 150) {
            callBack();
        }
    }, false);
};