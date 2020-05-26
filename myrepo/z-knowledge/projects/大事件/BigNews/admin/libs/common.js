

// ?a=123&b=456&c=789

function praseUrl(search) {
    let arr = search.substring(1).split('&')
    let obj = {}
    arr.forEach(item => {
        let arrItem = item.split('=');
        obj[arrItem[0]] = arrItem[1]
    })
    return obj
}

// let search = '?a=123&b=456&c=789';
// let res = praseUrl(search)
// console.log(res);


function initJedate() {
    jeDate("#indate", {
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        trigger: "click",
        isinitVal: true,
    })
}

function initTinymce() {
    tinymce.init({
        selector: '#mytextarea',
        branding: false,
        plugins: "code",
    });
}