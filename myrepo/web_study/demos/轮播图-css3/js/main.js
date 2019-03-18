window.addEventListener('load', () => {

    // 获取元素及一些参数
    let ul = document.getElementsByTagName('ul')[0];
    let ulLength = ul.getElementsByTagName('li').length;
    let liWidth = ul.getElementsByTagName('li')[0].offsetWidth;
    let ol = document.getElementsByTagName('ol')[0];

    let pointWidth = 20;

    // 拼接前后图片，最后一张加到开头，第一张加到结尾
    let firstImg = ul.firstElementChild.cloneNode(true);
    let lastImg = ul.lastElementChild.cloneNode(true);
    ul.insertBefore(lastImg, ul.children[0]);
    ul.appendChild(firstImg);

    // 动态设置ul的宽度
    ul.style.width = '' + liWidth * (ulLength + 2) + 'px';


    //动态添加指示器节点
    let str = '';
    for (let i = 0; i < ulLength; i++) {
        str += '<li></li>'
    }
    ol.innerHTML = str;
    let lis = ol.getElementsByTagName('li');
    lis[0].className = 'current';
    ol.style.width = '' + ulLength * pointWidth + 'px';
    ol.style.marginLeft = '' + -ulLength * pointWidth / 2 + 'px';



    // css3动画函数
    let addTransition = (obj) => {
        obj.style.transaction = 'all .2s ease';
        obj.style.webkitTransition = 'all .2s ease';

    };


    let removeTransition = (obj) => {
        obj.style.transaction = '';
        obj.style.webkitTransition = '';
    };

    let changeTranslateX = (obj, x) => {
        obj.style.transform = `translateX(${x}px)`;
        obj.style.webkitTransform = `translateX(${x}px)`
    };



    let index = 1;
    let timer = null;

    timer = setInterval(() => {

        // 图片移动
        index++;
        addTransition(ul);
        changeTranslateX(ul, -index * liWidth);


        // 指示器移动
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }

        let liIndex = index;
        if (liIndex >= ulLength + 1) {
            liIndex = 1
        }
        lis[liIndex - 1].className = 'current'

    }, 1000);


    // 边界值处理
    ul.addEventListener('webkitTransitionEnd', () => {
        // 最大边界值处理，无需处理最小边界值
        console.log(index);
        if (index === ulLength + 1) {
            index = 1;
            removeTransition(ul);
            changeTranslateX(ul, -liWidth)
        }
    });
});