$(function () {
    // 1.给去注册账号添加 鼠标点击事件
    $('#link_reg').on('click', function () {
        // 登录盒子隐藏
        $('.login_box').hide();
        // 注册盒子显示出来
        $('.reg_box').show();
    });
    // 2. 给去登录账号链接 绑定鼠标点击事件
    $('#link_login').on('click', function () {
        // 当前注册盒子隐藏
        $('.reg_box').hide();
        // 登录盒子 显示
        $('.login_box').show();
    });
    // 3. 从layui中 导出 form方法
    var form = layui.form;
    // console.log(form);
    form.verify({
        // (1) 自定义一个pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 判断 两次密码输入是否一致
        repwd: function (value) {
            // 通过行参 获取到的值是用户在 确认密码中输入的值
            // 还需要拿到用户在密码框中输入的值
            // 对这两次的结果 作比较
            // 如果判断失败 则return一个提示消息即可
            var pwd = $('#form-reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致！';
            }
        },
    });

    // 4.从layui中 导出 layer方法
    var layer = layui.layer;
    // console.log(layer);
    // 给注册表单绑定 submit 事件
    $('#form-reg').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 向服务器发送ajax 请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function (res) {
                // (1)如果 服务器返回 回来的状态 不等于 0 说明 失败，把服务器返回的消息提示给用户
                if (res.status !== 0) return layer.msg(res.message);
                // (2)如果等于 0 表示成功，则也把服务器返回的消息提示给用户
                layer.msg(res.message);
                // (3) 注册成功后 模拟人的点击行为，让页面跳转到登录页面
                $('#link_login').click();
            }
        });
    });
    // 5. 给登录 页面表单 添加 submit 事件
    $('#form-login').on('submit', function (e) {
        // 阻止表达的默认 提交行为
        e.preventDefault();
        // 向服务器 发送 登录的ajax 请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                // 判断服务器返回 过来的数据
                if (res.status !== 0) return layer.msg(res.message);
                // 否则提示用户登录成功
                layer.msg(res.message);
                // 登录成功后将返回的token值存放到本地存储中
                localStorage.setItem('token', res.token);
                // 再跳转到主页中
                location.href = '/index.html';
            }
        })
    })
})