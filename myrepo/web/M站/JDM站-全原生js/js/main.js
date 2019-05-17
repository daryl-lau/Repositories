window.addEventListener('load', () => {

////////////////////////轮播图开始////////////////////////////////////

    let binner = () => {
        // 获取元素及一些参数
        // let ul = document.getElementsByTagName('ul')[0];
        // let ulLength = ul.getElementsByTagName('li').length;
        // let liWidth = ul.getElementsByTagName('li')[0].offsetWidth;
        // let ol = document.getElementsByTagName('ol')[0];
        // let pointWidth = 20;
        // debugger;
        let ul = document.querySelector('#product .banner ul');
        let ulLength = ul.getElementsByTagName('li').length;
        // let liWidth = ul.getElementsByTagName('li')[0].offsetWidth;
        let liWidth = document.querySelector('#wrapper').offsetWidth;
        let ol = document.querySelector('#product .banner ol');
        let pointWidth = 12;

        // 拼接前后图片，最后一张加到开头，第一张加到结尾
        let firstImg = ul.firstElementChild.cloneNode(true);
        let lastImg = ul.lastElementChild.cloneNode(true);
        ul.insertBefore(lastImg, ul.children[0]);
        ul.appendChild(firstImg);

        // 动态设置li宽度
        let allimgs = ul.querySelectorAll('img');
        // console.log(allimgs);
        for (let i = 0; i < ulLength + 2; i++) {
            // console.log(i);
            allimgs[i].style.width = liWidth + 'px';
        }

        // 动态设置ul的宽度
        ul.style.width = '' + liWidth * (ulLength + 2) + 'px';
        // console.log(ul.style.width);
        // ul.style.transform: translateX(-520px);
        ul.style.transform = 'translateX(' + -liWidth + 'px)';
        // console.log(ul.style.transform);

        //动态添加指示器节点
        let str = '';
        for (let i = 0; i < ulLength; i++) {
            str += '<li></li>'
        }
        ol.innerHTML = str;
        let lis = ol.getElementsByTagName('li');
        lis[0].className = 'current';
        ol.style.width = ulLength * pointWidth + 'px';
        ol.style.marginLeft = -ulLength * pointWidth / 2 + 'px';


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
        /**
         * 下标移动函数
         */
        let changeIndex = () => {
            for (let i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            liIndex = index;
            if (index >= ulLength + 1) { //9
                liIndex = 1
            } else if (index <= 0) {
                liIndex = ulLength
            }
            lis[liIndex - 1].className = 'current';
        };
        /**
         * 自动轮播函数
         */
        let autoPlay = () => {
            // 图片移动
            index++;
            addTransition(ul);
            changeTranslateX(ul, -index * liWidth);
            // 指示器移动
            changeIndex()
        };
        let index = 1;
        let liIndex = 1;
        let timer = null;
        timer = setInterval(autoPlay, 5000);
        // 边界值处理
        ul.addEventListener('webkitTransitionEnd', () => {
            // 最大边界值处理
            if (index >= ulLength + 1) {   //9
                index = 1;
            } else if (index <= 0) {
                index = ulLength;      //8
            }
            removeTransition(ul);
            changeTranslateX(ul, -liWidth * index)
        });


        // 拖动效果
        let startX = 0;
        let endX = 0;
        let distanceX = 0;
        ul.addEventListener('touchstart', (e) => {
            clearInterval(timer);
            startX = e.touches[0].clientX;
        });
        ul.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            distanceX = startX - endX;
            removeTransition(ul);
            changeTranslateX(ul, -index * liWidth - distanceX)
        });
        ul.addEventListener('touchend', (e) => {
            if (Math.abs(distanceX) > 1 / 3 * liWidth && endX !== 0) {
                if (distanceX > 0) {
                    index++
                } else if (distanceX < 0) {
                    index--
                }
            }
            addTransition(ul);
            changeTranslateX(ul, -index * liWidth);
            changeIndex();
            timer = setInterval(autoPlay, 5000);
            startX = 0;
            endX = 0;
            distanceX = 0;
        });
    };
    binner();

////////////////////////轮播图结束////////////////////////////////////


////////////////////////关闭广告开始//////////////////////////////////
    let closeAD = () => {
        let btnClose = document.querySelector('.middle-img .icon-close');
        let closeEle = document.querySelector('.middle-img a img');
        btnClose.addEventListener('click', () => {
            btnClose.style.display = 'none';
            variableMove(closeEle, {'height': 0}, 10, () => {
                closeEle.style.display = 'none';
            })
        });
    };
    // closeAD();


////////////////////////关闭广告结束//////////////////////////////////


////////////////////////新闻滚动开始/////////////////////////////////

    let newsSCroll = () => {
        // 拼接li
        // 拼接前后图片，最后一张加到开头，第一张加到结尾
        let newsUl = document.querySelector('.news-content ul');
        let liLength = newsUl.querySelectorAll('li').length;
        let liHeight = newsUl.children[0].offsetHeight;
        let firstLi = newsUl.firstElementChild.cloneNode(true);
        let lastLi = newsUl.lastElementChild.cloneNode(true);
        newsUl.insertBefore(lastLi, newsUl.children[0]);
        newsUl.appendChild(firstLi);


        // 动态设置ul的宽度
        // newsUl.style.height = (liLength + 2) * 100 + '%';
        newsUl.style.transform = 'translateY(' + -liHeight + 'px)';


        // 获取li的长度


        //设置css3动画
        let addTransitionY = (obj) => {
            obj.style.transaction = 'all .5s ease';
            obj.style.webkitTransition = 'all .5s ease';

        };
        let removeTransitionY = (obj) => {
            obj.style.transaction = '';
            obj.style.webkitTransition = '';
        };
        let changeTranslateY = (obj, x) => {
            obj.style.transform = `translateY(${x}px)`;
            obj.style.webkitTransform = `translateY(${x}px)`
        };

        let newsAutoPlay = () => {
            // li移动
            newsindex++;
            addTransitionY(newsUl);
            changeTranslateY(newsUl, -newsindex * liHeight);
        };
        let newsindex = 1;

        let newsTimer = null;
        newsTimer = setInterval(newsAutoPlay, 3000);

        // 边界值处理
        newsUl.addEventListener('webkitTransitionEnd', () => {
            // 最大边界值处理，无需处理最小边界值
            if (newsindex >= liLength + 1) {   //5
                newsindex = 1;
            } else if (newsindex <= 0) {
                newsindex = liLength;      //4
            }
            removeTransitionY(newsUl);
            changeTranslateY(newsUl, -liHeight * newsindex)
        });
    };
    newsSCroll();

////////////////////////新闻滚动结束/////////////////////////////////

////////////////////////滚动事件开始/////////////////////////////////
    let header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        let scrollTop = scroll().top;
        if (scrollTop > 0) {
            header.style.backgroundColor = '#e43130';
        } else if (scrollTop === 0) {
            header.style.backgroundColor = 'transparent';
        }
    });


////////////////////////滚动事件结束/////////////////////////////////


////////////////////////秒杀倒计时开始/////////////////////////////////
    let killTime = () => {
        var text = document.querySelector('.kill-timer');

        //设置未来的某个时间
        var futureDate = new Date('2019/10/23 23:59:59');

        function getTime() {

            //获取当前的时间戳
            var currentDate = new Date();
            var currentTime = currentDate.getTime();

            //获取未来的时间戳
            var futureTime = futureDate.getTime();

            //获取差值，单位毫秒
            var totalTime = futureTime - currentTime;


            //将差值转换为天，时，分，秒
            if (totalTime <= 0) {
                clearInterval(timerKill);
            }
            else {
                var d = Math.floor(totalTime / 1000 / 60 / 60 / 24);
                var h = Math.floor(totalTime / 1000 / 60 / 60 % 24);
                var m = Math.floor(totalTime / 1000 / 60 % 60);
                var s = Math.floor(totalTime / 1000 % 60);

                // let timeArray = [];
                //
                // timeArray.push(d, h, m, s);
                //
                // for (var i = 0; i < timeArray.length; i++) {
                //     if (timeArray[i] < 10) {
                //         timeArray[i] = '0' + timeArray[i]
                //     } else {
                //         timeArray[i] = timeArray[i].toString()
                //     }
                // }

                h < 10 ? '0' + h : h

                // text.innerText = d + '天' + h + '时' + m + '分' + s + '秒';
                // text.innerHTML = '<span>' + timeArray[0] + '</span><span>天</span><span>' + timeArray[1] + '</span><span>时</span><span>' + timeArray[2] + '</span><span>分</span><span>' + timeArray[3] + '</span><span>秒</span>'
                text.innerHTML = '<span>' + (d < 10 ? '0' + d : d) + '</span><span>天</span><span>' + (h < 10 ? '0' + h : h) + '</span><span>时</span><span>' + (m < 10 ? '0' + m : m) + '</span><span>分</span><span>' + (s < 10 ? '0' + s : s) + '</span><span>秒</span>'
            }
        }

        var timerKill = setInterval(getTime, 1000);
        getTime();
    };
    killTime();

///////////////////////////////秒杀倒计时结束////////////////////////////////


///////////////////////////////秒杀滚动开始////////////////////////////////

    // let killScroll = () => {
    //     let li = document.querySelector('.product-wrap li');
    //     let liWidth = li.offsetWidth;
    //     let liLength = document.querySelectorAll('.product-wrap li').length;
    //
    //     let liMarginLeft = parseInt(getStyle(li, 'marginLeft'));
    //     let liMarginRight = parseInt(getStyle(li, 'marginLeft'));
    //
    //     // 设置ul宽度
    //     let ul = document.querySelector('.product-wrap');
    //     ul.style.width = (liWidth + liMarginLeft + liMarginRight) * liLength + 'px';
    // };
    // killScroll();

    let jumpHerf = () => {
        let allLis = document.querySelectorAll('.product-wrap li');
        for (let i = 0; i < allLis.length; i++) {
            allLis[i].addEventListener('click', () => {
                let alink = allLis[i].querySelector('a');
                location.href = alink.getAttribute('data-href');
            })
        }
    };
    jumpHerf();


    let windowResize = () => {
        window.addEventListener('resize', () => {
            let timer = null;
            clearTimeout(timer);
            timer = setTimeout(() => {
                location.reload();
            }, 500)
        })
    };
    windowResize();

///////////////////////////////秒杀滚动结束////////////////////////////////
});