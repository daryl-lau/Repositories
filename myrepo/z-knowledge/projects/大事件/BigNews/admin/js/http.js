(function (w) {
    let baseUrl = 'http://localhost:8080/api/v1';
    let bigNew = {
        baseUrl: baseUrl,
        user_login: baseUrl + '/admin/user/login',
        user_info: baseUrl + '/admin/user/info',
        user_detail: baseUrl + '/admin/user/detail',
        user_edit: baseUrl + '/admin/user/edit',
        catagory_list: baseUrl + '/admin/category/list',
        catagory_add: baseUrl + '/admin/category/add',
        catagory_delete: baseUrl + '/admin/category/delete',
        catagory_edit: baseUrl + '/admin/category/edit',
        article_query: baseUrl + '/admin/article/query',
        article_delete: baseUrl + '/admin/article/delete',
        article_publish: baseUrl + '/admin/article/publish',
        article_search: baseUrl + '/admin/article/search',
        article_edit: baseUrl + '/admin/article/edit',
        comment_search: baseUrl + '/admin/comment/search',
        comment_pass: baseUrl + '/admin/comment/pass',
        comment_reject: baseUrl + '/admin/comment/reject',
        comment_delete: baseUrl + '/admin/comment/delete',
        data_article: baseUrl + '/admin/data/article',
        data_info: baseUrl + '/admin/data/info',
        data_category: baseUrl + '/admin/data/category',
    }

    w.bigNew = bigNew;
})(window)