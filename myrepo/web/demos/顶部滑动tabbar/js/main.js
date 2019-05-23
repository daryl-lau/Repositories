window.onload=function(){
    var lis = document.getElementsByTagName('li');
    for (var i = 0; i < lis.length; i++){
        if (hasClass(lis[i], 'bottom-shadow')){
            console.log(lis[i]);

            lis[i].style.boxShadow = '-50px 42px 0px 5px skyblue;'
            
            console.log(lis[i])
        }
    }
    
}