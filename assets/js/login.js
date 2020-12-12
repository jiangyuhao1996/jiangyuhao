$(function(){
    //表单切换
    $(".gotoRegi").click(function(){
        $(this).parent().hide().next().show()
    })
    $(".gotoLogin").click(function(){
        $(this).parent().hide().prev().show()
    })

    //layer，添加自定义添加筛选
    let form = layui.form
    let layer = layui.layer

    form.verify({
        //数组添加筛选
        pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        //函数添加筛选
        repass: function(value,item){
            if(value !== $(".reIpt").val()){
                return "两次密码输入不一样"
            }
        } 
    })

    //表单登陆发送ajax请求
    $(".loginForm").submit(function(event){
        event.preventDefault()

        let data = $(this).serialize()

        $.ajax({
            url: "http://ajax.frontend.itheima.net/api/login",
            type: "post",
            data,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg("登陆成功，两秒后进行跳转",{time:2000},function(){
                    location.href = "./index.html"
                })
            }
        })
    })

    //表单注册发送ajax请求
    $(".regiForm").submit(function(event){
        event.preventDefault()

        let data = $(this).serialize()
        // console.log(data)

        $.ajax({
            url: "http://ajax.frontend.itheima.net/api/reguser",
            type: "post",
            data,
            success: function(res){
                // console.log(res)
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，两秒后进行跳转",{time:2000},function(){
                    $(".regiForm")[0].reset()
                    $(".gotoLogin").click()
                })
            }
        })
    })
})