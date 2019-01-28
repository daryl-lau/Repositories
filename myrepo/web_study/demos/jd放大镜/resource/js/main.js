window.onload = function () {


    var prevBtn = document.querySelector('#prev');
    var nextBtn = document.querySelector('#next');
    var lis = document.querySelectorAll('.view_s_box li');
    var ul = document.querySelector('.view_s_box ul');
    var viewM = document.querySelector('.view_m');
    var videoBtn = document.querySelector('.video-btn');
    var video = document.querySelector('.video');
    var viewB = document.querySelector('.view_b');


    if (lis.length > 5){
        prevBtn.onclick = function () {
            uniformMove(ul, {'left':0});
            removeClass(this, 'hover');
            addClass(this, 'disabled');
        };

        nextBtn.onclick = function () {
            uniformMove(ul, {'left':-228});
            addClass(this, 'disabled');
            removeClass(this, 'hover')
        };

        prevBtn.onmouseover = function () {
            if (parseInt(ul.offsetLeft) === 0){
                addClass(this, 'disabled');
            }else {
                addClass(this, 'hover')
            }
        };

        nextBtn.onmouseover = function () {
            if (parseInt(ul.offsetLeft) === -228){
                addClass(this, 'disabled');
            }else {
                addClass(this, 'hover')
            }
        };

        prevBtn.onmouseout = function(){
            removeClass(prevBtn, 'hover')
        };

        nextBtn.onmouseout = function(){
            removeClass(nextBtn, 'hover')
        };

    }else {
        addClass(prevBtn, 'disabled');
        addClass(nextBtn, 'disabled');
    }

    for (var i = 0; i < lis.length; i++){
        lis[i].onmouseover = function () {
            for (var j = 0; j < lis.length; j++){
                removeClass(lis[j], 'img-hover')
            }
            addClass(this, 'img-hover');
            viewM.style.backgroundImage = "url(" + this.children[0].src.replace(/s54x54/i, "m450x450") + ")";
            viewB.style.backgroundImage = "url(" + this.children[0].src.replace(/s54x54/i, "b800x800") + ")";
        }
    }
    
    videoBtn.onclick = function () {
        video.style.display = 'block';
        video.children[0].play();
        video.children[0].onended = function () {
            video.children[0].pause();
            video.children[0].currentTime=0;
            video.style.display = 'none';
        };
    };

    video.children[1].onclick = function () {
        video.children[0].pause();
        video.children[0].currentTime=0;
        video.style.display = 'none';
    };

};