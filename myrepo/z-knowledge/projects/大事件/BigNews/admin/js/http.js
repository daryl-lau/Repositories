(function (w) {
    let baseUrl = 'http://localhost:8080/api/v1';
    let bigNew = {
        baseUrl: baseUrl,
        user_login: baseUrl + '/admin/user/login',
        user_info: baseUrl + '/admin/user/info',
        user_detail: baseUrl + '/admin/user/detail',
        user_edit: baseUrl + '/admin/user/edit',
    }

    w.bigNew = bigNew;
})(window)