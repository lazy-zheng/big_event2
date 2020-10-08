$(function () {
    // 注意：(1) 当每次调用$.get 或 $.post 或 $.ajax的时候 都会先去调用 $.ajaxPrefilter这个函数
    // (2) 在这个函数中 我们可以拿到ajax 的配置对象
    $.ajaxPrefilter(function (options) {
        // 在发起真正的Ajax请求之前，统一拼接请求根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
    })
})