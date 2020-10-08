$(function () {
    // 注意：(1) 当每次调用$.get 或 $.post 或 $.ajax的时候 都会先去调用 $.ajaxPrefilter这个函数
    // (2) 在这个函数中 我们可以拿到ajax 的配置对象
    $.ajaxPrefilter(function (options) {
        // 在发起真正的Ajax请求之前，统一拼接请求根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
        // 统一为有权限的接口，设置headers请求头
        // 如果options.url中可以查找到 /my 字符串的话，就给请求设置headers 设置请求头
        if (options.url.indexOf('/my') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || '',
            };
            // 无论请求成功还是失败都会去执行complete函数
            options.complete = function (res) {
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    // 跳转到 login 登录页面
                    location.href = '/login.html';
                    // 清空本地 存储中token的值
                    localStorage.removeItem('token');
                }
            }
        }
    })
})