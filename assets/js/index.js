// 调用获取用户的基本信息函数
getUserinfo();
// 1.获取用户的基本信息
function getUserinfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message);
            // 调用渲染用户头像的函数
            renderAvatar(res.data);
        }
    })
}
// 2. 渲染用户头像 以及信息的函数
function renderAvatar(user) {
    console.log(user);
    // 1. 获取用户的名称
    var uname = user.nickname || user.username;
    // 2. 渲染欢迎 *** 的文本内容
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    // 3.渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').prop('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 把用户名的第一个字母出来的 转换为大写 赋值给文本头像内容
        var text = uname[0].toUpperCase();
        // console.log(text);
        $('.text-avatar').html(text).show();
        $('.layui-nav-img').hide();
    }
}
// 3.点击退出按钮 实现退出到login 登录页面的效果
// 从 layui中导出 layer方法
var layer = layui.layer;
$('#dropOut').on('click', function () {
    layer.confirm('确认退出?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        // (1)确认退出后 清空 本地存储中的token值
        localStorage.removeItem('token');
        // (2)并且跳转到登录页面
        location.href = '/login.html';
        // (3)这是关闭询问框的
        layer.close(index);
    });
})